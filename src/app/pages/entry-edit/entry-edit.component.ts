import { Component } from '@angular/core';
import { IEntry } from 'src/app/models/entry.model';
import { ITranslation } from 'src/app/models/translation.model';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent {
  entryDto?: IEntry | undefined;
  errorMessages?= [];

  save() {

  }
  cancel() {

  }

  deleteTranslation(translationId:string) {

  }

  canAddPronunciation(): boolean {

    return true;
  }
  toggleRecording() {

  }

  newTranslation() {

  }

  canEditEntry(): boolean {
    return true;
  }

  promoteTranslation(translation: ITranslation) {

  }
  /*
      [Inject] TFormValidator? DtoValidator { get; set; }
    public List<string> ErrorMessages { get; set; } = new();
    public bool FormSubmitted { get; set; }

    protected bool ExecuteSafely(Action action)
    {
        try
        {
            action();
            return true;
        }
        catch (Exception ex)
        {
            ErrorMessages.Clear();
            ErrorMessages.Add(ex.Message);
            return false;
        }
    }
    protected async Task<bool> ExecuteSafelyAsync(Func<Task> func)
    {
        try
        {
            await func();
            return true;
        }
        catch (Exception ex)
        {
            ErrorMessages.Clear();
            ErrorMessages.Add(ex.Message);

            ExceptionHandler?.LogError(ex);
            return false;
        }
    }
    private bool Validate(TFormDto? formDto, string[]? validationRuleSets)
    {
        if (formDto == null)
        {
            throw new NullReferenceException("formDto is null!");
        }

        // Form validation
        ErrorMessages.Clear();

        ValidationResult? result;
        if (validationRuleSets == null)
        {
            result = DtoValidator?.Validate(formDto);
        }
        else
        {
            result = DtoValidator?.Validate(formDto, options => options.IncludeRuleSets(validationRuleSets));
        }

        if (result!.IsValid == false)
        {
            ErrorMessages.AddRange(result.Errors.Select(err => err.ErrorMessage));
            return false;
        }

        return true;
    }

    public async Task ValidateAndSubmitAsync(TFormDto? formDto, Func<Task> func, string[]? validationRuleSets = null)
    {
        if (Validate(formDto, validationRuleSets) == false)
        {
            return;
        }

        // Block controls
        await JsInterop.Disable("[data-id=form_container]");

        // Process
        if (await ExecuteSafelyAsync(func))
        {
            FormSubmitted = true;
        }

        // Unblock controls
        await JsInterop.Enable("[data-id=form_container]");

        await RefreshUiAsync();
    }
}

    public EntryEditViewModel()
  {
      JsInteropService.OnRemoveAudio = (recordingId) =>
      {
          var removedSound = EntryDto.SoundDtos.FirstOrDefault(s => s.SoundId.Equals(recordingId));
          if (removedSound == null)
          {
              throw ExceptionHandler!.Error("Sound doesn't exist in the dto");
          }

          EntryDto.SoundDtos.Remove(removedSound);
      };

      JsInteropService.OnPromoteAudio = (recordingId) =>
      {
          var pronunciation = EntryDto.SoundDtos.FirstOrDefault(s => s.SoundId.Equals(recordingId));
          if (pronunciation == null)
          {
              throw ExceptionHandler!.Error("Sound doesn't exist in the dto");
          }

          Task.Run(() => PromotePronunciationAsync(pronunciation));
      };

      JsInteropService.OnAudioRecorded = async (entryId, soundId, soundB64) =>
      {
          isRecording = false;
          await RefreshUiAsync();
      };
  }

  [Parameter] public string? EntryId { get; set; }
  [Inject] FileService FileService { get; set; }
  public EntryDto EntryDto { get; set; } = new EntryDto();
  bool isRecording;
  bool existingSoundsRendered;
  PronunciationDto latestSoundDto;
  List<string> _newTranslationIds = new List<string>();
  internal bool CanEditEntry { get; private set; } = true;
  public bool IsStoppingRecording { get; private set; }

  private async Task RenderExistingSounds()
  {
      if (UserStore?.CurrentUser == null)
      {
          throw new NullReferenceException("Current user should not be null");
      }
      foreach (var soundDto in EntryDto.SoundDtos)
      {
          bool canPromote = UserStore.CurrentUser.CanPromote(soundDto.Rate, soundDto.UserId);
          bool canRemove = UserStore.CurrentUser.CanRemove(soundDto.Rate, soundDto.UserId, soundDto.CreatedAt);

          await JsInterop.AddExistingEntryRecording(soundDto, canPromote, canRemove);
      }

      existingSoundsRendered = true;
  }

  protected override async Task OnAfterRenderAsync(bool firstRender)
  {
      if (!existingSoundsRendered)
      {
          await RenderExistingSounds();
      }

      await base.OnAfterRenderAsync(firstRender);
  }

  protected override async Task OnParametersSetAsync()
  {
      if (UserStore.CurrentUser == null)
      {
          ExceptionHandler?.LogError("EntryEditViewModel: OnParametersSetAsync - CurrentUser is null");
          NavigationManager.NavigateTo("/");
      }

      if (string.IsNullOrEmpty(EntryId))
      {
          await NewTranslationAsync();
          return;
      }

      // Load the EntryDto for the existing entry being edited
      var existingEntry = ContentStore.CachedSearchResult.Entries
          .Where(e => e.Type == EntryType.Word)
          .Cast<EntryModel>()
          .FirstOrDefault(w => w.EntryId == EntryId);

      if (existingEntry == null)
      {
          existingEntry = await ContentStore.EntryService.GetAsync(EntryId);
      }
      EntryDto = EntryDto.FromModel(existingEntry);

      // Load audio recordings, if any
      foreach (var soundDto in EntryDto.SoundDtos)
      {
          var soundPath = Path.Combine(FileService.EntrySoundsDirectory, soundDto.FileName);
          if (!File.Exists(soundPath))
          {
              // TODO: Retireve
              continue;
          }

          soundDto.RecordingB64 = File.ReadAllText(soundPath);
      }

      CanEditEntry = UserStore.CurrentUser?.CanEdit(EntryDto.Rate, EntryDto.UserId!) == true;

      await base.OnParametersSetAsync();
  }

  #region Translation Handlers

  public async Task NewTranslationAsync()
  {
      if (UserStore.CurrentUser == null)
      {
          ExceptionHandler?.LogError("EntryEditViewModel: NewTranslation - CurrentUser is null");
          NavigationManager.NavigateTo("/");
          return;
      }

      var translation = new TranslationDto(EntryDto.EntryId, UserStore.CurrentUser!.Id, ContentStore.Languages.First());

      // Needed to know which translations are new, in case they need to be removed
      _newTranslationIds.Add(translation.TranslationId);

      EntryDto.TranslationsDtos.Add(translation);

      await RefreshUiAsync();
  }
  public async Task PromoteEntryAsync(EntryDto entryDto)
  {
      await ContentStore.EntryService.PromoteAsync(entryDto, UserStore.CurrentUser);
  }

  public async Task PromoteTranslationAsync(TranslationDto translationDto)
  {
      await ContentStore.EntryService.PromoteTranslationAsync(translationDto, UserStore.CurrentUser);
  }

  public async Task PromotePronunciationAsync(PronunciationDto soundDto)
  {
      await ContentStore.EntryService.PromotePronunciationAsync(soundDto, UserStore.CurrentUser);
  }

  public async Task DeleteTranslationAsync(string translationId)
  {
      var translationDto = EntryDto.TranslationsDtos.Find(t => t.TranslationId.Equals(translationId))!;
      if (!(UserStore.CurrentUser?.CanRemove(translationDto.Rate, translationDto.UserId, translationDto.CreatedAt) == true))
      {
          return;
      }

      if (_newTranslationIds.Contains(translationId))
      {
          _newTranslationIds.Remove(translationId);
      }

      EntryDto.TranslationsDtos.Remove(translationDto);
      await RefreshUiAsync();
  }
  #endregion

  #region Form Actions


  public async Task ToggleRecording()
  {
      if (isRecording)
      {
          await StopRecording();
      }
      else
      {
          await StartRecording();
      }
      await RefreshUiAsync();
  }
  private async Task StartRecording()
  {
      isRecording = true;
      latestSoundDto = new PronunciationDto();
      latestSoundDto.EntryId = EntryDto.EntryId!;
      latestSoundDto.Rate = UserStore.CurrentUser!.GetRateRange().Lower;
      latestSoundDto.UserId = UserStore.CurrentUser!.Id;

      await JsInterop.StartRecording(latestSoundDto.SoundId);
  }

  private async Task StopRecording()
  {
      isRecording = false;
      await JsInterop.StopRecording(EntryId!);
      await RefreshUiAsync();
      //latestSoundDto.RecordingB64 = recording;
      //EntryDto.SoundDtos.Add(latestSoundDto);
  }

  private async Task WaitForNewRecording()
  {
      IsStoppingRecording = true;
  }

  public async Task SaveClickHandler()
  {
      if (EntryDto.TranslationsDtos.Count() == 0)
      {
          if (await AskForConfirmation("Question:Do_you_really_want_to_add_new_entry_without_a_translation?") != true)
          {
              return;
          }
      }

      await ValidateAndSubmitAsync(EntryDto, Save);
  }

  public async Task Save()
  {
      var user = UserStore.CurrentUser;
      if (user == null)
      {
          throw new NullReferenceException("CurrentUser must not be null");
      }

      if (EntryDto.CreatedAt != DateTimeOffset.MinValue)
      {
          await ContentStore.EntryService.UpdateAsync(EntryDto, user.Id);
      }
      else
      {
          var userSourceId = "63a816205d1af0e432fba6de";
          EntryDto.SourceId = userSourceId;
          EntryDto.UserId = user.Id;
          await ContentStore.EntryService.AddAsync(EntryDto, user.Id);
      }

      NavigationManager.NavigateTo("/");
  }
  #endregion
  */
}