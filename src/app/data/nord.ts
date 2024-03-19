import {Color} from "../models/Color";

export class Nord {

    tertiaryRaw = [
        "rgb(93.725% 94.902% 96.863%)",
        "rgb(80.392% 84.706% 89.804%)",
        "rgb(70.98% 77.255% 85.098%)",
        "rgb(57.647% 67.059% 78.039%)",
        "rgb(49.412% 60.392% 74.118%)",
        "rgb(36.863% 50.588% 67.451%)",
        "rgb(33.725% 45.882% 61.569%)",
        "rgb(26.275% 36.078% 47.843%)",
        "rgb(20.392% 27.843% 37.255%)",
        "rgb(15.294% 21.176% 28.235%)"
    ]


    neutralListRaw = [
        "rgb(98.431% 98.824% 99.216%)",
        "rgb(95.294% 96.078% 97.255%)",
        "rgb(92.941% 94.118% 96.078%)",
        "rgb(89.804% 91.373% 94.118%)",
        "rgb(87.843% 89.804% 92.941%)",
        "rgb(84.706% 87.059% 91.373%)",
        "rgb(77.255% 79.216% 83.137%)",
        "rgb(60% 61.961% 64.706%)",
        "rgb(46.667% 47.843% 50.196%)",
        "rgb(35.686% 36.471% 38.431%)"
    ]

    tertiary= this.tertiaryRaw.map(c => Color.fromString(c))
    neutralLight= this.neutralListRaw.map(c => Color.fromString(c))


    static printColors(colors: Color[], group: string = "Colors") {
        console.group(group)
        const str = colors.map(c => '\"' + c.toString() + '\"').join(",\n")
        console.log(str)
        console.groupEnd()
    }
}
