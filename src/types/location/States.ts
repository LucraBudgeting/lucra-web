export enum statesFull {
  'AL' = 'Alabama',
  'AK' = 'Alaska',
  'AS' = 'American Samoa',
  'AZ' = 'Arizona',
  'AR' = 'Arkansas',
  'CA' = 'California',
  'CO' = 'Colorado',
  'CT' = 'Connecticut',
  'DE' = 'Delaware',
  'DC' = 'District Of Columbia',
  'FM' = 'Federated States Of Micronesia',
  'FL' = 'Florida',
  'GA' = 'Georgia',
  'GU' = 'Guam',
  'HI' = 'Hawaii',
  'ID' = 'Idaho',
  'IL' = 'Illinois',
  'IN' = 'Indiana',
  'IA' = 'Iowa',
  'KS' = 'Kansas',
  'KY' = 'Kentucky',
  'LA' = 'Louisiana',
  'ME' = 'Maine',
  'MH' = 'Marshall Islands',
  'MD' = 'Maryland',
  'MA' = 'Massachusetts',
  'MI' = 'Michigan',
  'MN' = 'Minnesota',
  'MS' = 'Mississippi',
  'MO' = 'Missouri',
  'MT' = 'Montana',
  'NE' = 'Nebraska',
  'NV' = 'Nevada',
  'NH' = 'New Hampshire',
  'NJ' = 'New Jersey',
  'NM' = 'New Mexico',
  'NY' = 'New York',
  'NC' = 'North Carolina',
  'ND' = 'North Dakota',
  'MP' = 'Northern Mariana Islands',
  'OH' = 'Ohio',
  'OK' = 'Oklahoma',
  'OR' = 'Oregon',
  'PW' = 'Palau',
  'PA' = 'Pennsylvania',
  'PR' = 'Puerto Rico',
  'RI' = 'Rhode Island',
  'SC' = 'South Carolina',
  'SD' = 'South Dakota',
  'TN' = 'Tennessee',
  'TX' = 'Texas',
  'UT' = 'Utah',
  'VT' = 'Vermont',
  'VI' = 'Virgin Islands',
  'VA' = 'Virginia',
  'WA' = 'Washington',
  'WV' = 'West Virginia',
  'WI' = 'Wisconsin',
  'WY' = 'Wyoming',
}

export enum stateAbbreviation {
  'Alabama' = 'AL',
  'Alaska' = 'AK',
  'American Samoa' = 'AS',
  'Arizona' = 'AZ',
  'Arkansas' = 'AR',
  'California' = 'CA',
  'Colorado' = 'CO',
  'Connecticut' = 'CT',
  'Delaware' = 'DE',
  'District Of Columbia' = 'DC',
  'Federated States Of Micronesia' = 'FM',
  'Florida' = 'FL',
  'Georgia' = 'GA',
  'Guam' = 'GU',
  'Hawaii' = 'HI',
  'Idaho' = 'ID',
  'Illinois' = 'IL',
  'Indiana' = 'IN',
  'Iowa' = 'IA',
  'Kansas' = 'KS',
  'Kentucky' = 'KY',
  'Louisiana' = 'LA',
  'Maine' = 'ME',
  'Marshall Islands' = 'MH',
  'Maryland' = 'MD',
  'Massachusetts' = 'MA',
  'Michigan' = 'MI',
  'Minnesota' = 'MN',
  'Mississippi' = 'MS',
  'Missouri' = 'MO',
  'Montana' = 'MT',
  'Nebraska' = 'NE',
  'Nevada' = 'NV',
  'New Hampshire' = 'NH',
  'New Jersey' = 'NJ',
  'New Mexico' = 'NM',
  'New York' = 'NY',
  'North Carolina' = 'NC',
  'North Dakota' = 'ND',
  'Northern Mariana Islands' = 'MP',
  'Ohio' = 'OH',
  'Oklahoma' = 'OK',
  'Oregon' = 'OR',
  'Palau' = 'PW',
  'Pennsylvania' = 'PA',
  'Puerto Rico' = 'PR',
  'Rhode Island' = 'RI',
  'South Carolina' = 'SC',
  'South Dakota' = 'SD',
  'Tennessee' = 'TN',
  'Texas' = 'TX',
  'Utah' = 'UT',
  'Vermont' = 'VT',
  'Virgin Islands' = 'VI',
  'Virginia' = 'VA',
  'Washington' = 'WA',
  'West Virginia' = 'WV',
  'Wisconsin' = 'WI',
  'Wyoming' = 'WY',
}

type stateType = {
  name: string;
  abbreviation: string;
};

export const statesArray: stateType[] = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
  {
    name: 'American Samoa',
    abbreviation: 'AS',
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
  },
  {
    name: 'California',
    abbreviation: 'CA',
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM',
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
  },
  {
    name: 'Guam',
    abbreviation: 'GU',
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
  },
  {
    name: 'Marshall Islands',
    abbreviation: 'MH',
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
  },
  {
    name: 'New York',
    abbreviation: 'NY',
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    abbreviation: 'MP',
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
  },
  {
    name: 'Palau',
    abbreviation: 'PW',
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
  },
  {
    name: 'Puerto Rico',
    abbreviation: 'PR',
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI',
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
  },
];

export const getState = (state: string): stateType =>
  statesArray.filter((item) => item.name === state || item.abbreviation === state)[0];
