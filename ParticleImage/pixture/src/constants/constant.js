
const fontPath = '../../public/fonts/'  // type Font = { name: string; src: string };

const settingsMap = [
    { 'propertyName': 'symbolColor', 'propertyValue': ['default', 'white', 'black', 'red', 'yellow', 'green', 'cyan', 'purple', 'pink', 'orange',] },
    { 'propertyName': 'symbolShadow', 'propertyValue': ['default', 'white', 'red', 'black', 'yellow', 'gold'] },
    { 'propertyName': 'background', 'propertyValue': ['default', 'white', 'black', 'lavender', 'DarkCyan', 'red', 'yellow', 'pink', 'aqua'], 'gradientColors': [] },
    { 'propertyName': 'fontStyle', 'propertyValue': ['monospace', 'Helvetica', 'veranda', 'cursive'] },
]


const Fonts = [
    ['xcompany', `${fontPath}/XCompany.ttf`],
    ['creamy sugar', `${fontPath}/CreamySugar-gxnGR.ttf`],
    ['emotional', `${fontPath}/EmotionalRescuePersonalUseRegular-PKY87.ttf`],
    ['glorious', `${fontPath}/GloriousChristmas-BLWWB.ttf`],
    ['grandspace', `${fontPath}/GrandSpaceFreeTrial-lgwmX.otf`],
    ['superfunky', `${fontPath}/SuperFunky-lgmWw.ttf`],
    ['superpencil', `${fontPath}/SuperPencil-ARGw7.ttf`],
    ['superugged', `${fontPath}/SuperRugged-4nBy9.ttf`],
    ['texascrust', `${fontPath}/TexasCrustPersonalUseReg-w1nrw.ttf`],
    ['pumpkin', `${fontPath}/PumpkinTypeHalloween.ttf`],
]

const Gradients = [
    {
        "name": "Omolon",
        "colors": ["#091E3A", "#2F80ED", "#2D9EE0"]
    },
    {
        "name": "Farhan",
        "colors": ["#9400D3", "#4B0082"]
    },
    {
        "name": "Purple",
        "colors": ["#c84e89", "#F15F79"]
    },
    {
        "name": "Ibtesam",
        "colors": ["#00F5A0", "#00D9F5"]
    },
    {
        "name": "Radioactive Heat",
        "colors": ["#F7941E", "#72C6EF", "#00A651"]
    },
    {
        "name": "The Sky And The Sea",
        "colors": ["#F7941E", "#004E8F"]
    },
    {
        "name": "From Ice To Fire",
        "colors": ["#72C6EF", "#004E8F"]
    },
    {
        "name": "Blue & Orange",
        "colors": ["#FD8112", "#0085CA"]
    },
    {
        "name": "Purple Dream",
        "colors": ["#bf5ae0", "#a811da"]
    },
    {
        "name": "Blu",
        "colors": ["#00416A", "#E4E5E6"]
    },
    {
        "name": "Summer Breeze",
        "colors": ["#fbed96", "#abecd6"]
    },
]


export { settingsMap, Fonts, Gradients};