const siteName = 'Vimamos.ru'
const protocol = 'http://';
const hostName = 'cms.shoesgo.ru/'
const siteUrl = `${protocol}${hostName}}/`;

const quantityProducts = 21 // количество товаров на странице категории
const quantityProductsMainSlider = 10 // количество товаров в сладере на главной странице

const salePriceCoefficient = 1.3 // коэфициент наценки

const partnerLinks = [
    {shopName: 'Колёса Даром', shopLink: 'https://ad.admitad.com/g/phemb8m2uc0d7044f8f7ccd85565ce/?ulp='},
    {shopName: 'Lacoste', shopLink: 'https://dhwnh.com/g/f446ccbb457d8def2aa9d5f2d2f9d4/?erid=5jtCeReLm1S3Xx3LfcL1t9f&ulp='},
    {shopName: 'Thomas Munz', shopLink: 'https://tplto.com/go/5f0d10f7e21a426bd1c3e4242aaa9b3e365b64d1eb0a0b0b/?dpl='},
    {shopName: 'ECCO', shopLink: 'https://kdbov.com/g/avmsvi2rfc7d8def2aa92cb26b7aaa/?erid=25H8d7vbP8SRTvFaD2wbvp&ulp='},
]

const sortSettings = [
    {sortName: 'price', sortType: 'desc', sortText: 'Сначала дорогие'},
    {sortName: 'price', sortType: 'asc', sortText: 'Сначала дешевые'},
    {sortName: '', sortType: 'clear', sortText: 'Не сортировать'}
]

const colors = [
    { name: 'белый', code: '#FFFFFF', slug: 'belyj' },
    { name: 'голубой', code: '#87CEEB', slug: 'goluboj' },
    { name: 'коричневый', code: '#964B00', slug: 'korichnevyj' },
    { name: 'серо-белый', code: '#E5E5E5', slug: 'sero-belyj' },
    { name: 'серый', code: '#808080', slug: 'seryj' },
    { name: 'синий', code: '#0000FF', slug: 'sinij' },
    { name: 'черный', code: '#000000', slug: 'chernyj' },
    { name: 'абрикосовый', code: '#FBCEB1', slug: 'abrikosovyj' },
    { name: 'бежево-розовый', code: '#FFE4C4', slug: 'bezhevo-rozovyj' },
    { name: 'бежевый', code: '#F5F5DC', slug: 'bezhevyj' },
    { name: 'бирюзовый', code: '#40E0D0', slug: 'biryuzovyj' },
    { name: 'болотный', code: '#4F4F2F', slug: 'bolotnyj' },
    { name: 'бордовый', code: '#800000', slug: 'bordovyj' },
    { name: 'бронзовый', code: '#CD7F32', slug: 'bronzovyj' },
    { name: 'брусничный', code: '#A52A2A', slug: 'brusnichnyj' },
    { name: 'желтый', code: '#FFFF00', slug: 'zheltyj' },
    { name: 'зеленый', code: '#008000', slug: 'zelenyj' },
    { name: 'золотой', code: '#FFD700', slug: 'zolotoj' },
    { name: 'изумрудно-зеленый', code: '#50C878', slug: 'izumrudno-zelenyj' },
    { name: 'изумрудный', code: '#35866D', slug: 'izumrudnyj' },
    { name: 'кирпичный', code: '#B22222', slug: 'kirpichnyj' },
    { name: 'коралловый', code: '#FF7F50', slug: 'korallovyj' },
    { name: 'красно-коричневый', code: '#8B2323', slug: 'krasno-korichnevyj' },
    { name: 'красный', code: '#FF0000', slug: 'krasnyj' },
    { name: 'лимонный', code: '#FFF700', slug: 'limonnyj' },
    { name: 'молочный', code: '#FFFAFA', slug: 'molochnyj' },
    { name: 'мультицвет', code: '#334835', slug: 'multicvet' },
    { name: 'мультицвет розовый', code: '#FF69B4', slug: 'multicvet-rozovyj' },
    { name: 'мятный', code: '#98FF98', slug: 'myatnyj' },
    { name: 'оливковый', code: '#808000', slug: 'olivkovyj' },
    { name: 'оранжевый', code: '#FFA500', slug: 'oranzhevyj' },
    { name: 'персиковый', code: '#FFDAB9', slug: 'persikovyj' },
    { name: 'песочный', code: '#F4A460', slug: 'pesochnyj' },
    { name: 'розово-бежевый', code: '#F2D2BD', slug: 'rozovo-bezhevyj' },
    { name: 'розово-фиолетовый', code: '#C71585', slug: 'rozovo-fioletovyj' },
    { name: 'розовый', code: '#FFC0CB', slug: 'rozovyj' },
    { name: 'розовый металлик', code: '#FFB5C5', slug: 'rozovyj-metallik' },
    { name: 'рыже-коричневый', code: '#8B4513', slug: 'ryzhe-korichnevyj' },
    { name: 'рыжий', code: '#D2691E', slug: 'ryzhij' },
    { name: 'салатовый', code: '#99FF99', slug: 'salatovyj' },
    { name: 'св.бежевый', code: '#F5F5DC', slug: 'sv-bezhevyj' },
    { name: 'св.коричневый', code: '#DEB887', slug: 'sv-korichnevyj' },
    { name: 'св.розовый', code: '#FFB6C1', slug: 'sv-rozovyj' },
    { name: 'св.серый', code: '#D3D3D3', slug: 'sv-seryj' },
    { name: 'светло-голубой', code: '#87CEFA', slug: 'svetlo-goluboj' },
    { name: 'светло-коричневый', code: '#D2B48C', slug: 'svetlo-korichnevyj' },
    { name: 'светло-розовый', code: '#FFB6C1', slug: 'svetlo-rozovyj' },
    { name: 'светло-серый', code: '#D3D3D3', slug: 'svetlo-seryj' },
    { name: 'светло-сиреневый', code: '#E6E6FA', slug: 'svetlo-sirenevyj' },
    { name: 'серебряный', code: '#C0C0C0', slug: 'serebryanyj' },
    { name: 'серо-бежевый', code: '#D4BE9C', slug: 'sero-bezhevyj' },
    { name: 'серо-бежевый металлик', code: '#C4B5A2', slug: 'sero-bezhevyj-metallik' },
    { name: 'серо-голубой', code: '#6B8E9E', slug: 'sero-goluboj' },
    { name: 'серо-зеленый', code: '#8FBC8F', slug: 'sero-zelenyj' },
    { name: 'серо-коричневый', code: '#796878', slug: 'sero-korichnevyj' },
    { name: 'серо-розовый', code: '#C4A4A4', slug: 'sero-rozovyj' },
    { name: 'серо-синий', code: '#4682B4', slug: 'sero-sinij' },
    { name: 'серый металлик', code: '#A9A9A9', slug: 'seryj-metallik' },
    { name: 'сиреневый', code: '#C8A2C8', slug: 'sirenevyj' },
    { name: 'телесный', code: '#FFE4C4', slug: 'telesnyj' },
    { name: 'темно-голубой', code: '#00688B', slug: 'temno-goluboj' },
    { name: 'темно-зеленый', code: '#006400', slug: 'temno-zelenyj' },
    { name: 'темно-коричневый', code: '#5C4033', slug: 'temno-korichnevyj' },
    { name: 'темно-розовый', code: '#FF1493', slug: 'temno-rozovyj' },
    { name: 'темно-серый', code: '#696969', slug: 'temno-seryj' },
    { name: 'темно-синий', code: '#00008B', slug: 'temno-sinij' },
    { name: 'фиолетовый', code: '#800080', slug: 'fioletovyj' },
    { name: 'хаки', code: '#BDB76B', slug: 'xaki' },
    { name: 'ярко-зеленый', code: '#00FF00', slug: 'yarko-zelenyj' }
];

module.exports = {
    siteName,
    hostName,
    siteUrl,
    quantityProducts,
    quantityProductsMainSlider,
    salePriceCoefficient,
    partnerLinks,
    sortSettings,
    colors
};

