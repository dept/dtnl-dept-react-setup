export const messages = {
  required: {
    general: 'Dit veld is verplicht.',
    email: 'Je e-mailadres is verplicht',
    birthDate: 'Je geboortedatum is verplicht',
    password: 'Kies een wachtwoord',
    termsOfService: 'Accepteer de voorwaarden om door te gaan.',
  },
  validation: {
    initials: 'Gebruik alleen letters',
    general: 'Invoer ongeldig',
    email: 'Dit is geen geldig e-mailadres',
    phoneNumber: 'Dit is geen geldig telefoonnummer',
    date: 'Vul de datum in op de volgende manier xx-xx-xxxx',
    birthDate: 'Vul je geboortedatum in op de volgende manier xx-xx-xxxx',
    bodyText: 'De beschrijving moet minimaal 400 tekens lang zijn',
    postalCode: 'Dit is geen geldige postcode',
    houseNumber: 'Dit is geen geldig huisnummer',
    profileImage: 'Upload een afbeelding van maximaal 2MB groot',
    salary: {
      moreThan: 'Het maximale salaris kan niet lager zijn dan het minimale salaris',
      lessThan: 'Het minimale salaris kan niet hoger zijn dan het maximale salaris',
    },
    password: {
      weakPassword:
        'Kies een wachtwoord van minimaal 8 karakters bestaande uit\n minimaal één cijfer, één hoofdletter en één vreemd teken.',
      notMatching: 'De wachtwoorden komen niet overeen',
    },
  },
}

export const regex = {
  postalCode: /[1-9][0-9]{3}(?!sa|sd|ss)\s?[A-Za-z]{2}/,
  houseNumber: /^\d{1,5}$/,
  password: /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  phoneNumber: /^(?:^0[0-57-9][0-9]{2}[-\s]?[0-9]{6}$)|(?:^0[0-57-9][0-9][-\s]?[0-9]{7}$)|(?:^06[-\s]?[0-9]{8}$)$/,
  birthDate: /(\d{2})-(\d{2})-(\d{4})/,
}
