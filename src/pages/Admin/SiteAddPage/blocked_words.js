const blockedWords = [
	"www",
	"api",
	"dns",
	"hosting",
	"beaconswebadmin",
	"dashboard",
	"admin",
	"18397818",
	"em9764",
	"hosting.ghs",
	"mx",
	"4r5e",
	"5h1t",
	"5hit",
	"a55",
	"anal",
	"anus",
	"ar5e",
	"arrse",
	"arse",
	"ass",
	"ass-fucker",
	"asses",
	"assfucker",
	"assfukka",
	"asshole",
	"assholes",
	"asswhole",
	"a_s_s",
	"b!tch",
	"b00bs",
	"b17ch",
	"b1tch",
	"ballbag",
	"balls",
	"ballsack",
	"bastard",
	"beastial",
	"beastiality",
	"bellend",
	"bestial",
	"bestiality",
	"bi+ch",
	"biatch",
	"bitch",
	"bitcher",
	"bitchers",
	"bitches",
	"bitchin",
	"bitching",
	"bloody",
	"blowjob",
	"blowjob",
	"blowjobs",
	"boiolas",
	"bollock",
	"bollok",
	"boner",
	"boob",
	"boobs",
	"booobs",
	"boooobs",
	"booooobs",
	"booooooobs",
	"breasts",
	"buceta",
	"bugger",
	"bum",
	"bunnyfucker",
	"butt",
	"butthole",
	"buttmuch",
	"buttplug",
	"c0ck",
	"c0cksucker",
	"carpetmuncher",
	"cawk",
	"chink",
	"cipa",
	"cl1t",
	"clit",
	"clitoris",
	"clits",
	"cnut",
	"cock",
	"cock-sucker",
	"cockface",
	"cockhead",
	"cockmunch",
	"cockmuncher",
	"cocks",
	"cocksuck",
	"cocksucked",
	"cocksucker",
	"cocksucking",
	"cocksucks",
	"cocksuka",
	"cocksukka",
	"cok",
	"cokmuncher",
	"coksucka",
	"coon",
	"cox",
	"crap",
	"cum",
	"cummer",
	"cumming",
	"cums",
	"cumshot",
	"cunilingus",
	"cunillingus",
	"cunnilingus",
	"cunt",
	"cuntlick",
	"cuntlicker",
	"cuntlicking",
	"cunts",
	"cyalis",
	"cyberfuc",
	"cyberfuck",
	"cyberfucked",
	"cyberfucker",
	"cyberfuckers",
	"cyberfucking",
	"d1ck",
	"damn",
	"dick",
	"dickhead",
	"dildo",
	"dildos",
	"dink",
	"dinks",
	"dirsa",
	"dlck",
	"dog-fucker",
	"doggin",
	"dogging",
	"donkeyribber",
	"doosh",
	"duche",
	"dyke",
	"ejaculate",
	"ejaculated",
	"ejaculates",
	"ejaculating",
	"ejaculatings",
	"ejaculation",
	"ejakulate",
	"fuck",
	"fucker",
	"f4nny",
	"fag",
	"fagging",
	"faggitt",
	"faggot",
	"faggs",
	"fagot",
	"fagots",
	"fags",
	"fanny",
	"fannyflaps",
	"fannyfucker",
	"fanyy",
	"fatass",
	"fcuk",
	"fcuker",
	"fcuking",
	"feck",
	"fecker",
	"felching",
	"fellate",
	"fellatio",
	"fingerfuck",
	"fingerfucked",
	"fingerfucker",
	"fingerfuckers",
	"fingerfucking",
	"fingerfucks",
	"fistfuck",
	"fistfucked",
	"fistfucker",
	"fistfuckers",
	"fistfucking",
	"fistfuckings",
	"fistfucks",
	"flange",
	"fook",
	"fooker",
	"fuck",
	"fucka",
	"fucked",
	"fucker",
	"fuckers",
	"fuckhead",
	"fuckheads",
	"fuckin",
	"fucking",
	"fuckings",
	"fuckingshitmotherfucker",
	"fuckme",
	"fucks",
	"fuckwhit",
	"fuckwit",
	"fudgepacker",
	"fudgepacker",
	"fuk",
	"fuker",
	"fukker",
	"fukkin",
	"fuks",
	"fukwhit",
	"fukwit",
	"fux",
	"fux0r",
	"f_u_c_k",
	"gangbang",
	"gangbanged",
	"gangbangs",
	"gaylord",
	"gaysex",
	"goatse",
	"god-dam",
	"god-damned",
	"goddamn",
	"goddamned",
	"hardcoresex",
	"hell",
	"heshe",
	"hoar",
	"hoare",
	"hoer",
	"homo",
	"hore",
	"horniest",
	"horny",
	"hotsex",
	"jack-off",
	"jackoff",
	"jap",
	"jerk-off",
	"jism",
	"jiz",
	"jizm",
	"jizz",
	"kawk",
	"knob",
	"knobead",
	"knobed",
	"knobend",
	"knobhead",
	"knobjocky",
	"knobjokey",
	"kock",
	"kondum",
	"kondums",
	"kum",
	"kummer",
	"kumming",
	"kums",
	"kunilingus",
	"l3i+ch",
	"l3itch",
	"labia",
	"lmfao",
	"lust",
	"lusting",
	"m0f0",
	"m0fo",
	"m45terbate",
	"ma5terb8",
	"ma5terbate",
	"masochist",
	"master-bate",
	"masterb8",
	"masterbat",
	"masterbat3",
	"masterbate",
	"masterbation",
	"masterbations",
	"masturbate",
	"mo-fo",
	"mof0",
	"mofo",
	"mothafuck",
	"mothafucka",
	"mothafuckas",
	"mothafuckaz",
	"mothafucked",
	"mothafucker",
	"mothafuckers",
	"mothafuckin",
	"mothafucking",
	"mothafuckings",
	"mothafucks",
	"motherfucker",
	"motherfuck",
	"motherfucked",
	"motherfucker",
	"motherfuckers",
	"motherfuckin",
	"motherfucking",
	"motherfuckings",
	"motherfuckka",
	"motherfucks",
	"muff",
	"mutha",
	"muthafecker",
	"muthafuckker",
	"muther",
	"mutherfucker",
	"n1gga",
	"n1gger",
	"nazi",
	"nigg3r",
	"nigg4h",
	"nigga",
	"niggah",
	"niggas",
	"niggaz",
	"nigger",
	"niggers",
	"nob",
	"nobjokey",
	"nobhead",
	"nobjocky",
	"nobjokey",
	"numbnuts",
	"nutsack",
	"orgasim",
	"orgasims",
	"orgasm",
	"orgasms",
	"p0rn",
	"pawn",
	"pecker",
	"penis",
	"penisfucker",
	"phonesex",
	"phuck",
	"phuk",
	"phuked",
	"phuking",
	"phukked",
	"phukking",
	"phuks",
	"phuq",
	"pigfucker",
	"pimpis",
	"piss",
	"pissed",
	"pisser",
	"pissers",
	"pisses",
	"pissflaps",
	"pissin",
	"pissing",
	"pissoff",
	"poop",
	"porn",
	"porno",
	"pornography",
	"pornos",
	"prick",
	"pricks",
	"pron",
	"pube",
	"pusse",
	"pussi",
	"pussies",
	"pussy",
	"pussys",
	"rectum",
	"retard",
	"rimjaw",
	"rimming",
	"shit",
	"s.o.b.",
	"sadist",
	"schlong",
	"screwing",
	"scroat",
	"scrote",
	"scrotum",
	"semen",
	"sex",
	"sh!+",
	"sh!t",
	"sh1t",
	"shag",
	"shagger",
	"shaggin",
	"shagging",
	"shemale",
	"shi+",
	"shit",
	"shitdick",
	"shite",
	"shited",
	"shitey",
	"shitfuck",
	"shitfull",
	"shithead",
	"shiting",
	"shitings",
	"shits",
	"shitted",
	"shitter",
	"shitters",
	"shitting",
	"shittings",
	"shitty",
	"skank",
	"slut",
	"sluts",
	"smegma",
	"smut",
	"snatch",
	"son-of-a-bitch",
	"spac",
	"spunk",
	"s_h_i_t",
	"t1tt1e5",
	"t1tties",
	"teets",
	"teez",
	"testical",
	"testicle",
	"tit",
	"titfuck",
	"tits",
	"titt",
	"tittie5",
	"tittiefucker",
	"titties",
	"tittyfuck",
	"tittywank",
	"titwank",
	"tosser",
	"turd",
	"tw4t",
	"twat",
	"twathead",
	"twatty",
	"twunt",
	"twunter",
	"v14gra",
	"v1gra",
	"vagina",
	"viagra",
	"vulva",
	"w00se",
	"wang",
	"wank",
	"wanker",
	"wanky",
	"whoar",
	"whore",
	"willies",
	"willy",
	"xrated",
	"xxx",
	"arsehole",
	"assbag",
	"assbandit",
	"assbanger",
	"assbite",
	"assclown",
	"asscock",
	"asscracker",
	"assface",
	"assfuck",
	"assgoblin",
	"asshat",
	"ass-hat",
	"asshead",
	"asshopper",
	"ass-jabber",
	"assjacker",
	"asslick",
	"asslicker",
	"assmonkey",
	"assmunch",
	"assmuncher",
	"assnigger",
	"asspirate",
	"ass-pirate",
	"assshit",
	"assshole",
	"asssucker",
	"asswad",
	"asswipe",
	"axwound",
	"bampot",
	"beaner",
	"bitchass",
	"bitchtits",
	"bitchy",
	"bollocks",
	"bollox",
	"brotherfucker",
	"bullshit",
	"bumblefuck",
	"buttplug",
	"buttfucka",
	"butt-pirate",
	"buttfucker",
	"cameltoe",
	"carpetmuncher",
	"chesticle",
	"chinc",
	"choad",
	"chode",
	"clitface",
	"clitfuck",
	"clusterfuck",
	"cockass",
	"cockbite",
	"cockburger",
	"cockfucker",
	"cockjockey",
	"cockknoker",
	"cockmaster",
	"cockmongler",
	"cockmongruel",
	"cockmonkey",
	"cocknose",
	"cocknugget",
	"cockshit",
	"cocksmith",
	"cocksmoke",
	"cocksmoker",
	"cocksniffer",
	"cockwaffle",
	"coochie",
	"coochy",
	"cooter",
	"cracker",
	"cumbubble",
	"cumdumpster",
	"cumguzzler",
	"cumjockey",
	"cumslut",
	"cumtart",
	"cunnie",
	"cuntass",
	"cuntface",
	"cunthole",
	"cuntrag",
	"cuntslut",
	"dago",
	"deggo",
	"dickbag",
	"dickbeaters",
	"dickface",
	"dickfuck",
	"dickfucker",
	"dickhole",
	"dickjuice",
	"dickmilk",
	"dickmonger",
	"dicks",
	"dickslap",
	"dick-sneeze",
	"dicksucker",
	"dicksucking",
	"dicktickler",
	"dickwad",
	"dickweasel",
	"dickweed",
	"dickwod",
	"dike",
	"dipshit",
	"doochbag",
	"dookie",
	"douche",
	"douchebag",
	"douche-fag",
	"douchewaffle",
	"dumass",
	"dumbass",
	"dumbass",
	"dumbfuck",
	"dumbshit",
	"dumshit",
	"fagbag",
	"fagfucker",
	"faggit",
	"faggotcock",
	"fagtard",
	"feltch",
	"flamer",
	"fuckass",
	"fuckbag",
	"fuckboy",
	"fuckbrain",
	"fuckbutt",
	"fuckbutter",
	"fuckersucker",
	"fuckface",
	"fuckhole",
	"fucknut",
	"fucknutt",
	"fuckoff",
	"fuckstick",
	"fucktard",
	"fucktart",
	"fuckup",
	"fuckwad",
	"fuckwitt",
	"gay",
	"gayass",
	"gaybob",
	"gaydo",
	"gayfuck",
	"gayfuckist",
	"gaytard",
	"gaywad",
	"goddamnit",
	"gooch",
	"gook",
	"gringo",
	"guido",
	"handjob",
	"hardon",
	"heeb",
	"ho",
	"hoe",
	"homodumbshit",
	"honkey",
	"humping",
	"jackass",
	"jagoff",
	"jerkoff",
	"jerkass",
	"jigaboo",
	"junglebunny",
	"junglebunny",
	"kike",
	"kooch",
	"kootch",
	"kraut",
	"kunt",
	"kyke",
	"lameass",
	"lardass",
	"lesbian",
	"lesbo",
	"lezzie",
	"mcfagget",
	"mick",
	"minge",
	"muffdiver",
	"munging",
	"negro",
	"nigaboo",
	"niglet",
	"nutsack",
	"paki",
	"panooch",
	"peckerhead",
	"penisbanger",
	"penispuffer",
	"pissedoff",
	"polesmoker",
	"pollock",
	"poon",
	"poonani",
	"poonany",
	"poontang",
	"porchmonkey",
	"porchmonkey",
	"punanny",
	"punta",
	"pussylicking",
	"puto",
	"queef",
	"queer",
	"queerbait",
	"queerhole",
	"renob",
	"rimjob",
	"ruski",
	"sandnigger",
	"sandnigger",
	"shitass",
	"shitbag",
	"shitbagger",
	"shitbrains",
	"shitbreath",
	"shitcanned",
	"shitcunt",
	"shitface",
	"shitfaced",
	"shithole",
	"shithouse",
	"shitspitter",
	"shitstain",
	"shittiest",
	"shiz",
	"shiznit",
	"skeet",
	"skullfuck",
	"slutbag",
	"smeg",
	"spic",
	"spick",
	"splooge",
	"spook",
	"suckass",
	"tard",
	"thundercunt",
	"twatlips",
	"twats",
	"twatwaffle",
	"unclefucker",
	"vag",
	"vajayjay",
	"va-j-j",
	"vjayjay",
	"wankjob",
	"wetback",
	"whorebag",
	"whoreface",
	"wop",
	"breeder",
	"cocklump",
	"creampie",
	"doublelift",
	"dumbcunt",
	"fuckoff",
	"incest",
	"jackOff",
	"poopuncher",
	"sandler",
	"cockeye",
	"crotte",
	"foah",
	"fucktwat",
	"jaggi",
	"kunja",
	"pust",
	"sanger",
	"seks",
	"slag",
	"zubb",
	"2g1c",
	"2girls1cup",
	"acrotomophilia",
	"alabamahotpocket",
	"alaskanpipeline",
	"anilingus",
	"apeshit",
	"autoerotic",
	"autoerotic",
	"babeland",
	"babybatter",
	"babyjuice",
	"ballgag",
	"ballgravy",
	"ballkicking",
	"balllicking",
	"ballsack",
	"ballsucking",
	"bangbros",
	"bareback",
	"barelylegal",
	"barenaked",
	"bastardo",
	"bastinado",
	"bbw",
	"bdsm",
	"beaners",
	"beavercleaver",
	"beaverlips",
	"bigblack",
	"bigbreasts",
	"bigknockers",
	"bigtits",
	"bimbos",
	"birdlock",
	"blackcock",
	"blondeaction",
	"blondeonblondeaction",
	"blowyourload",
	"bluewaffle",
	"blumpkin",
	"bondage",
	"bootycall",
	"brownshowers",
	"brunetteaction",
	"bukkake",
	"bulldyke",
	"bulletvibe",
	"bunghole",
	"bunghole",
	"busty",
	"buttcheeks",
	"camgirl",
	"camslut",
	"camwhore",
	"chocolaterosebuds",
	"circlejerk",
	"clevelandsteamer",
	"cloverclamps",
	"coprolagnia",
	"coprophilia",
	"cornhole",
	"coons",
	"darkie",
	"daterape",
	"daterape",
	"deepthroat",
	"deepthroat",
	"dendrophilia",
	"dingleberry",
	"dingleberries",
	"dirtypillows",
	"dirtysanchez",
	"doggiestyle",
	"doggiestyle",
	"doggystyle",
	"doggystyle",
	"dogstyle",
	"dolcett",
	"domination",
	"dominatrix",
	"dommes",
	"donkeypunch",
	"doubledong",
	"doublepenetration",
	"dpaction",
	"dryhump",
	"dvda",
	"eatmyass",
	"ecchi",
	"erotic",
	"erotism",
	"escort",
	"eunuch",
	"fecal",
	"felch",
	"femalesquirting",
	"femdom",
	"figging",
	"fingerbang",
	"fingering",
	"fisting",
	"footfetish",
	"footjob",
	"frotting",
	"fuckbuttons",
	"fucktards",
	"futanari",
	"gangbang",
	"gaysex",
	"genitals",
	"giantcock",
	"girlon",
	"girlontop",
	"girlsgonewild",
	"goatcx",
	"goddamn",
	"gokkun",
	"goldenshower",
	"goodpoop",
	"googirl",
	"goregasm",
	"grope",
	"groupsex",
	"g-spot",
	"guro",
	"handjob",
	"hardcore",
	"hardcore",
	"hentai",
	"homoerotic",
	"hooker",
	"hotcarl",
	"hotchick",
	"howtokill",
	"howtomurder",
	"hugefat",
	"intercourse",
	"jailbait",
	"jailbait",
	"jellydonut",
	"jiggaboo",
	"jiggerboo",
	"juggs",
	"kinbaku",
	"kinkster",
	"kinky",
	"knobbing",
	"leatherrestraint",
	"leatherstraightjacket",
	"lemonparty",
	"lolita",
	"lovemaking",
	"makemecome",
	"malesquirting",
	"menageatrois",
	"milf",
	"missionaryposition",
	"moundofvenus",
	"mrhands",
	"muffdiver",
	"muffdiving",
	"nambla",
	"nawashi",
	"neonazi",
	"nignog",
	"nimphomania",
	"nipple",
	"nipples",
	"nsfwimages",
	"nude",
	"nudity",
	"nympho",
	"nymphomania",
	"octopussy",
	"omorashi",
	"onecuptwogirls",
	"oneguyonejar",
	"orgy",
	"paedophile",
	"panties",
	"panty",
	"pedobear",
	"pedophile",
	"pegging",
	"phonesex",
	"pieceofshit",
	"pisspig",
	"pisspig",
	"playboy",
	"pleasurechest",
	"polesmoker",
	"ponyplay",
	"poof",
	"punany",
	"poopchute",
	"poopchute",
	"princealbertpiercing",
	"pthc",
	"pubes",
	"queaf",
	"quim",
	"raghead",
	"ragingboner",
	"rape",
	"raping",
	"rapist",
	"reversecowgirl",
	"rosypalm",
	"rosypalmandher5sisters",
	"rustytrombone",
	"sadism",
	"santorum",
	"scat",
	"scissoring",
	"sexo",
	"sexy",
	"shavedbeaver",
	"shavedpussy",
	"shibari",
	"shitblimp",
	"shota",
	"shrimping",
	"slanteye",
	"s&m",
	"snowballing",
	"sodomize",
	"sodomy",
	"sploogemoose",
	"spooge",
	"spreadlegs",
	"strapon",
	"strapon",
	"strappado",
	"stripclub",
	"styledoggy",
	"suck",
	"sucks",
	"suicidegirls",
	"sultrywomen",
	"swastika",
	"swinger",
	"taintedlove",
	"tastemy",
	"teabagging",
	"threesome",
	"throating",
	"tiedup",
	"tightwhite",
	"titty",
	"tongueina",
	"topless",
	"towelhead",
	"tranny",
	"tribadism",
	"tubgirl",
	"tubgirl",
	"tushy",
	"twink",
	"twinkie",
	"twogirlsonecup",
	"undressing",
	"upskirt",
	"urethraplay",
	"urophilia",
	"venusmound",
	"vibrator",
	"violetwand",
	"vorarephilia",
	"voyeur",
	"wetdream",
	"whitepower",
	"wrappingmen",
	"wrinkledstarfish",
	"xx",
	"yaoi",
	"yellowshowersnyiffy"
];

export default blockedWords;