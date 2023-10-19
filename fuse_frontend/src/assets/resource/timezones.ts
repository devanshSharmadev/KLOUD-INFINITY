const timezones = [
    {
        id: 'Etc/GMT+12',
        name: 'Dateline Standard Time - (UTC-12:00) International Date Line West',
    },
    {
        id: 'Etc/GMT+11',
        name: 'UTC-11 - (UTC-11:00) Coordinated Universal Time-11',
    },
    {
        id: 'Pacific/Honolulu',
        name: 'Hawaiian Standard Time - (UTC-10:00) Hawaii',
    },
    {
        id: 'America/Anchorage',
        name: 'Alaskan Standard Time - (UTC-09:00) Alaska',
    },
    {
        id: 'America/Santa_Isabel',
        name: 'Pacific Standard Time (Mexico) - (UTC-08:00) Baja California',
    },
    {
        id: 'America/Los_Angeles',
        name: 'Pacific Standard Time - (UTC-08:00) Pacific Time (US & Canada)',
    },
    {
        id: 'America/Creston',
        name: 'US Mountain Standard Time - (UTC-07:00) Arizona',
    },
    {
        id: 'America/Chihuahua',
        name: 'Mountain Standard Time (Mexico) - (UTC-07:00) Chihuahua, La Paz, Mazatlan',
    },
    {
        id: 'America/Boise',
        name: 'Mountain Standard Time - (UTC-07:00) Mountain Time (US & Canada)',
    },
    {
        id: 'America/Belize',
        name: 'Central America Standard Time - (UTC-06:00) Central America',
    },
    {
        id: 'America/Chicago',
        name: 'Central Standard Time - (UTC-06:00) Central Time (US & Canada)',
    },
    {
        id: 'America/Bahia_Banderas',
        name: 'Central Standard Time (Mexico) - (UTC-06:00) Guadalajara, Mexico City, Monterrey',
    },
    {
        id: 'America/Regina',
        name: 'Canada Central Standard Time - (UTC-06:00) Saskatchewan',
    },
    {
        id: 'America/Bogota',
        name: 'SA Pacific Standard Time - (UTC-05:00) Bogota, Lima, Quito',
    },
    {
        id: 'America/Detroit',
        name: 'Eastern Standard Time - (UTC-05:00) Eastern Time (US & Canada)',
    },
    {
        id: 'America/Indiana/Marengo',
        name: 'US Eastern Standard Time - (UTC-05:00) Indiana (East)',
    },
    {
        id: 'America/Caracas',
        name: 'Venezuela Standard Time - (UTC-04:30) Caracas',
    },
    {
        id: 'America/Asuncion',
        name: 'Paraguay Standard Time - (UTC-04:00) Asuncion',
    },
    {
        id: 'America/Glace_Bay',
        name: 'Atlantic Standard Time - (UTC-04:00) Atlantic Time (Canada)',
    },
    {
        id: 'America/Campo_Grande',
        name: 'Central Brazilian Standard Time - (UTC-04:00) Cuiaba',
    },
    {
        id: 'America/Anguilla',
        name: 'SA Western Standard Time - (UTC-04:00) Georgetown, La Paz, Manaus, San Juan',
    },
    {
        id: 'America/Santiago',
        name: 'Pacific SA Standard Time - (UTC-04:00) Santiago',
    },
    {
        id: 'America/St_Johns',
        name: 'Newfoundland Standard Time - (UTC-03:30) Newfoundland',
    },
    {
        id: 'America/Sao_Paulo',
        name: 'E. South America Standard Time - (UTC-03:00) Brasilia',
    },
    {
        id: 'America/Argentina/La_Rioja',
        name: 'Argentina Standard Time - (UTC-03:00) Buenos Aires',
    },
    {
        id: 'America/Araguaina',
        name: 'SA Eastern Standard Time - (UTC-03:00) Cayenne, Fortaleza',
    },
    {
        id: 'America/Godthab',
        name: 'Greenland Standard Time - (UTC-03:00) Greenland',
    },
    {
        id: 'America/Montevideo',
        name: 'Montevideo Standard Time - (UTC-03:00) Montevideo',
    },
    {
        id: 'America/Bahia',
        name: 'Bahia Standard Time - (UTC-03:00) Salvador',
    },
    {
        id: 'America/Noronha',
        name: 'UTC-02 - (UTC-02:00) Coordinated Universal Time-02',
    },
    {
        id: 'America/Scoresbysund',
        name: 'Azores Standard Time - (UTC-01:00) Azores',
    },
    {
        id: 'Atlantic/Cape_Verde',
        name: 'Cape Verde Standard Time - (UTC-01:00) Cape Verde Is.',
    },
    {
        id: 'Africa/Casablanca',
        name: 'Morocco Standard Time - (UTC) Casablanca',
    },
    {
        id: 'America/Danmarkshavn',
        name: 'UTC - (UTC) Coordinated Universal Time',
    },
    {
        id: 'Atlantic/Canary',
        name: 'GMT Standard Time - (UTC) Dublin, Edinburgh, Lisbon, London',
    },
    {
        id: 'Africa/Abidjan',
        name: 'Greenwich Standard Time - (UTC) Monrovia, Reykjavik',
    },
    {
        id: 'Arctic/Longyearbyen',
        name: 'W. Europe Standard Time - (UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
    },
    {
        id: 'Europe/Belgrade',
        name: 'Central Europe Standard Time - (UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
    },
    {
        id: 'Africa/Ceuta',
        name: 'Romance Standard Time - (UTC+01:00) Brussels, Copenhagen, Madrid, Paris',
    },
    {
        id: 'Europe/Sarajevo',
        name: 'Central European Standard Time - (UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
    },
    {
        id: 'Africa/Algiers',
        name: 'W. Central Africa Standard Time - (UTC+01:00) West Central Africa',
    },
    {
        id: 'Africa/Windhoek',
        name: 'Namibia Standard Time - (UTC+01:00) Windhoek',
    },
    {
        id: 'Asia/Nicosia',
        name: 'GTB Standard Time - (UTC+02:00) Athens, Bucharest',
    },
    {
        id: 'Asia/Beirut',
        name: 'Middle East Standard Time - (UTC+02:00) Beirut',
    },
    {
        id: 'Africa/Cairo',
        name: 'Egypt Standard Time - (UTC+02:00) Cairo',
    },
    {
        id: 'Asia/Damascus',
        name: 'Syria Standard Time - (UTC+02:00) Damascus',
    },
    {
        id: 'Asia/Nicosia',
        name: 'E. Europe Standard Time - (UTC+02:00) E. Europe',
    },
    {
        id: 'Africa/Blantyre',
        name: 'South Africa Standard Time - (UTC+02:00) Harare, Pretoria',
    },
    {
        id: 'Europe/Helsinki',
        name: 'FLE Standard Time - (UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
    },
    {
        id: 'Europe/Istanbul',
        name: 'Turkey Standard Time - (UTC+03:00) Istanbul',
    },
    {
        id: 'Asia/Jerusalem',
        name: 'Israel Standard Time - (UTC+02:00) Jerusalem',
    },
    {
        id: 'Africa/Tripoli',
        name: 'Libya Standard Time - (UTC+02:00) Tripoli',
    },
    {
        id: 'Asia/Amman',
        name: 'Jordan Standard Time - (UTC+03:00) Amman',
    },
    {
        id: 'Asia/Baghdad',
        name: 'Arabic Standard Time - (UTC+03:00) Baghdad',
    },
    {
        id: 'Europe/Kaliningrad',
        name: 'Kaliningrad Standard Time - (UTC+03:00) Kaliningrad, Minsk',
    },
    {
        id: 'Asia/Aden',
        name: 'Arab Standard Time - (UTC+03:00) Kuwait, Riyadh',
    },
    {
        id: 'Africa/Addis_Ababa',
        name: 'E. Africa Standard Time - (UTC+03:00) Nairobi',
    },
    {
        id: 'Europe/Kirov',
        name: 'Moscow Standard Time - (UTC+03:00) Moscow, St. Petersburg, Volgograd',
    },
    {
        id: 'Europe/Astrakhan',
        name: 'Samara Time - (UTC+04:00) Samara, Ulyanovsk, Saratov',
    },
    {
        id: 'Asia/Tehran',
        name: 'Iran Standard Time - (UTC+03:30) Tehran',
    },
    {
        id: 'Asia/Dubai',
        name: 'Arabian Standard Time - (UTC+04:00) Abu Dhabi, Muscat',
    },
    {
        id: 'Asia/Baku',
        name: 'Azerbaijan Standard Time - (UTC+04:00) Baku',
    },
    {
        id: 'Indian/Mahe',
        name: 'Mauritius Standard Time - (UTC+04:00) Port Louis',
    },
    {
        id: 'Asia/Tbilisi',
        name: 'Georgian Standard Time - (UTC+04:00) Tbilisi',
    },
    {
        id: 'Asia/Yerevan',
        name: 'Caucasus Standard Time - (UTC+04:00) Yerevan',
    },
    {
        id: 'Asia/Kabul',
        name: 'Afghanistan Standard Time - (UTC+04:30) Kabul',
    },
    {
        id: 'Antarctica/Mawson',
        name: 'West Asia Standard Time - (UTC+05:00) Ashgabat, Tashkent',
    },
    {
        id: 'Asia/Karachi',
        name: 'Pakistan Standard Time - (UTC+05:00) Islamabad, Karachi',
    },
    {
        id: 'Asia/Kolkata',
        name: 'India Standard Time - (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    },
    {
        id: 'Asia/Colombo',
        name: 'Sri Lanka Standard Time - (UTC+05:30) Sri Jayawardenepura',
    },
    {
        id: 'Asia/Katmandu',
        name: 'Nepal Standard Time - (UTC+05:45) Kathmandu',
    },
    {
        id: 'Antarctica/Vostok',
        name: 'Central Asia Standard Time - (UTC+06:00) Astana',
    },
    {
        id: 'Asia/Dhaka',
        name: 'Bangladesh Standard Time - (UTC+06:00) Dhaka',
    },
    {
        id: 'Asia/Yekaterinburg',
        name: 'Ekaterinburg Standard Time - (UTC+06:00) Ekaterinburg',
    },
    {
        id: 'Asia/Rangoon',
        name: 'Myanmar Standard Time - (UTC+06:30) Yangon (Rangoon)',
    },
    {
        id: 'Antarctica/Davis',
        name: 'SE Asia Standard Time - (UTC+07:00) Bangkok, Hanoi, Jakarta',
    },
    {
        id: 'Asia/Novokuznetsk',
        name: 'N. Central Asia Standard Time - (UTC+07:00) Novosibirsk',
    },
    {
        id: 'Asia/Hong_Kong',
        name: 'China Standard Time - (UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
    },
    {
        id: 'Asia/Krasnoyarsk',
        name: 'North Asia Standard Time - (UTC+08:00) Krasnoyarsk',
    },
    {
        id: 'Asia/Brunei',
        name: 'Singapore Standard Time - (UTC+08:00) Kuala Lumpur, Singapore',
    },
    {
        id: 'Antarctica/Casey',
        name: 'W. Australia Standard Time - (UTC+08:00) Perth',
    },
    {
        id: 'Asia/Taipei',
        name: 'Taipei Standard Time - (UTC+08:00) Taipei',
    },
    {
        id: 'Asia/Choibalsan',
        name: 'Ulaanbaatar Standard Time - (UTC+08:00) Ulaanbaatar',
    },
    {
        id: 'Asia/Irkutsk',
        name: 'North Asia East Standard Time - (UTC+09:00) Irkutsk',
    },
    {
        id: 'Asia/Dili',
        name: 'Tokyo Standard Time - (UTC+09:00) Osaka, Sapporo, Tokyo',
    },
    {
        id: 'Asia/Pyongyang',
        name: 'Korea Standard Time - (UTC+09:00) Seoul',
    },
    {
        id: 'Australia/Adelaide',
        name: 'Cen. Australia Standard Time - (UTC+09:30) Adelaide',
    },
    {
        id: 'Australia/Darwin',
        name: 'AUS Central Standard Time - (UTC+09:30) Darwin',
    },
    {
        id: 'Australia/Brisbane',
        name: 'E. Australia Standard Time - (UTC+10:00) Brisbane',
    },
    {
        id: 'Australia/Melbourne',
        name: 'AUS Eastern Standard Time - (UTC+10:00) Canberra, Melbourne, Sydney',
    },
    {
        id: 'Antarctica/DumontDUrville',
        name: 'West Pacific Standard Time - (UTC+10:00) Guam, Port Moresby',
    },
    {
        id: 'Australia/Currie',
        name: 'Tasmania Standard Time - (UTC+10:00) Hobart',
    },
    {
        id: 'Asia/Chita',
        name: 'Yakutsk Standard Time - (UTC+10:00) Yakutsk',
    },
    {
        id: 'Antarctica/Macquarie',
        name: 'Central Pacific Standard Time - (UTC+11:00) Solomon Is., New Caledonia',
    },
    {
        id: 'Asia/Sakhalin',
        name: 'Vladivostok Standard Time - (UTC+11:00) Vladivostok',
    },
    {
        id: 'Antarctica/McMurdo',
        name: 'New Zealand Standard Time - (UTC+12:00) Auckland, Wellington',
    },
    {
        id: 'Etc/GMT-12',
        name: 'UTC+12 - (UTC+12:00) Coordinated Universal Time+12',
    },
    {
        id: 'Pacific/Fiji',
        name: 'Fiji Standard Time - (UTC+12:00) Fiji',
    },
    {
        id: 'Asia/Anadyr',
        name: 'Magadan Standard Time - (UTC+12:00) Magadan',
    },
    {
        id: 'Asia/Kamchatka',
        name: 'Kamchatka Standard Time - (UTC+12:00) Petropavlovsk-Kamchatsky - Old',
    },
    {
        id: 'Etc/GMT-13',
        name: "Tonga Standard Time - (UTC+13:00) Nuku'alofa",
    },
    {
        id: 'Pacific/Apia',
        name: 'Samoa Standard Time - (UTC+13:00) Samoa',
    },
];

export const getTimezones = () => {
    return timezones;
};