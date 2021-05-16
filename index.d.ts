export declare interface IKeySettings {
    length: number;
    characters: "alphabetic" | "numeric" | "alphanumeric" | "hex" | string;
    case?: "upper" | "lower" | "both"
}

export declare interface IImageSettings {
    image: boolean;
    size: string;
    backgroundColor: string;
    textColor: string;
}

export declare interface IOptions {
    keySettings?: IKeySettings;
    imageSettings?: IImageSettings;
}

declare class Captchashi {
    public key: string;
    public image: string;
    constructor(settings: IOptions);
}

export default Captchashi;
