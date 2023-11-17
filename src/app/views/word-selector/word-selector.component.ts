import { Component } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-word-selector',
  templateUrl: './word-selector.component.html',
  styleUrls: ['./word-selector.component.scss']
})
export class WordSelectorComponent {
  searchQuery: string = '';
  entries: Entry[] | null = null; // Define Entry model according to your data structure
  selectedEntryId: string | null = null;

  search(e: Event): void {
    // Implement your search logic here
  }

  selectEntry(entry: Entry): void {
    this.selectedEntryId = entry.EntryId;
  }

  /**
   public List<EntryModel> Entries { get; set; }
   internal string? SearchQuery { get; set; }
   internal ElementReference SearchInputReference { get; set; }
   internal string? SelectedEntryId { get; set; }

   [Parameter]
   public EventCallback<EntryModel> OnEntrySelected { get; set; }
   public async Task SelectEntry(EntryModel entry)
   {
       SelectedEntryId = entry.EntryId;
       await OnEntrySelected.InvokeAsync(entry);
   }
   public async Task Search(ChangeEventArgs evgentArgs)
   {
       string? inputText = evgentArgs.Value?.ToString();
       if (string.IsNullOrWhiteSpace(inputText))
       {
           return;
       }

       Entries = (await ContentStore.EntryService.FindAsync(inputText)).ToList();
   }
   protected override async Task OnAfterRenderAsync(bool firstRender)
   {
       if (!firstRender)
       {
           await SearchInputReference.FocusAsync();
       }

       await base.OnAfterRenderAsync(firstRender);
   }
   */
}
