import {
  AdjectiveCharacteristics,
  AdjectiveSemanticType,
  Case,
  Degree,
  NameType,
  NounDeclension,
  NumeralType,
  NumericalCategory,
  NumericalComplexity,
  Transitiveness,
  VerbConjugation,
  VerbMood,
  VerbTense,
} from '../enums/word-details.enum';

interface VerbDetails {
  Tense: VerbTense;
  Conjugation: VerbConjugation;
  Mood: VerbMood;
  NumeralType: NumeralType;
  Transitiveness: Transitiveness;
  // Should be available only for some verbs, so don't allow to set it for all verbs
  Class: number;
}
interface PronounDetails {
  Classes: number[];
  Case: Case;
  Person: number;
}
interface NumeralDetails {
  Complexity: NumericalComplexity;
  Category: NumericalCategory;
  CaseSingular: Case;
  CasePlural: Case;
}
interface NounDetails {
  // One of 6 grammatical classes
  Class: number;
  // Cклонение
  // 4 Declensions of nouns
  // https://nohchalla.com/literatura/chechenskiy-yazyk/audio-yazyk/791-urok28
  Declension: NounDeclension;
  Case: Case;
  NameType: NameType;
  NumeralType: NumeralType;
}
interface AdjectiveDetails {
  // качественные и относительные
  SemanticType: AdjectiveSemanticType;
  // зависимые и независимые
  Characteristic: AdjectiveCharacteristics;
  SingularCase: Case;
  PluralCase: Case;
  // Степень - только у качественных
  Degree?: Degree;
  // Грамматический класс - только у качественных и то, некоторых
  Class?: number;
}
