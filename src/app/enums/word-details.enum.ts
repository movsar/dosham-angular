export enum VerbMood {
  // Наклонение
  Undefined = 0,
  Indicative = 1,
  Imperative = 2,
  InterrogativeIndicative = 3,
  RealConditional = 4,
  UnrealConditional = 5,
  RealDesiderative = 6,
  UnrealDesiderative = 7,
  /*
    1. Изъявительное наклонение – БИЛГАЛА САТТАМ
    2. Повелительное наклонение – ТIЕДОЖОРОН САТТАМ
    3. Вопросительная форма изъявительного наклонения – БИЛГАЛА САТТАМАН ХАТТАРАН КЕП
    4. Реально-условное наклонение (обстоятельственная форма глагола) –БАКЪ БОЛУ БЕХКАМАН САТТАМ
    5. Нереально-условное наклонение –БАКЪ БОЦУ БЕХКАМАН САТТАМ
    6. Реально-желательное наклонение – БАКЪ БОЛУ ЛААРАН САТТАМ
    7. Нереально-желательное наклонение – БАКЪ БОЦУ ЛААРАМ САТТАМ 

    Indicative mood - BILGALA SATTAM (statement)
    Imperative mood - TIYEDOJORON SATTAM (command)
    Interrogative indicative mood - BILGALA SATTAMAN HATTARAN KEP (question/statement)
    Real conditional mood (verbal adverbial form) - BAKY BOLU BEHKAMAN SATTAM (if...then)
    Unreal conditional mood - BAKY BOTSU BEHKAMAN SATTAM (if...then)
    Real desiderative mood - BAKY BOLU LAARAN SATTAM (hope/wish)
    Unreal desiderative mood - BAKY BOTSU LAARAM SATTAM (hope/wish)
  */
}

export enum VerbConjugation {
  Undefined = 0,
  Causative = 1,
  Inceptive = 2,
  Permissive = 3,
  PermissiveCausative = 4,
  Potential = 5,
}

export enum Transitiveness {
  Undefined = 0,
  Transitive = 1,
  Intransitive = 2,
}
export enum VerbTense {
  Undefined = 0,
  PresentContinuous = 1,
  PresentSimple = 2,
  FutureContinuous = 3,
  FutureSimple = 4,
  PastImperfect = 5,
  PastPerfect = 6,
  PastRecent = 7,
  PastWitnessed = 8,
  PastRemote = 9,
  Infinitive = 10,
}

export enum Person {
  First = 1,
  Second = 2,
  Third = 3,
}

export enum NumericalComplexity {
  Undefined = 0,
  // Простые
  Simple = 1,
  // Сложные
  Complex = 2,
  // Составные
  Composite = 3,
}

export enum NumericalCategory {
  Undefined = 0,
  // Масаллин
  Quantitative = 1,
  // Рог1аллин
  Ordinal = 2,
  // Эцаран
  Multiplicative = 3,
  // Декъаран
  Derivative = 4,
}

export enum NumeralType {
  Undefined = 0,
  Singular = 1,
  Plural = 2,
}

export enum NounDeclension {
  Undefined = 0,
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
}

export enum NameType {
  Undefined = 0,
  Proper = 1,
  Common = 2,
}

export enum Degree {
  Undefined = 0,
  Comparative = 1,

  // уступительная
  Concessive = 2,

  // превосходная
  Superlative = 3,
}

export enum Case {
  Undefined = 0,

  Absolutive = 1,
  Genitive = 2,
  Dative = 3,
  Ergative = 4,
  Allative = 5,
  Instrumental = 6,
  Locative = 7,
  Comparative = 8,
  /*
    ц1ерниг - мила? х1ун?
    доланиг - хьенан? стенан?
    лург - хьанна? стенна?
    дийриг - хьан? стен?
    коьчалниг - хьаьнца? стенца?
    хотталург - хьанах? стенах?
    меттигниг - хьаьнга? стенга?
    дустург - хьанал? стенал?
  */
}

export enum AdjectiveCharacteristics {
  Undefined = 0,
  Dependent = 1,
  Independent = 2,
}

export enum AdjectiveSemanticType {
  Undefined = 0,
  Qualitive = 1,
  Relative = 2,
}
