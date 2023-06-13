export interface IElement {
    tagName: string,
    className: string,
    id?: string

}


export interface IElementClass extends IElement {
    element: HTMLElement,
    addChild(childs: HTMLElement[]): void
    preAddChild(childs: HTMLElement[]): void
}

export interface IImageElement {
    src: string,
}

export interface IItemElement {
    active: boolean
    pause: boolean
    changeAudio(picture: string, audio: HTMLAudioElement): void
}

export interface IInputElement {
    element: HTMLInputElement
    type: string
    min: string
    max: string
    value: string | number
    changeVolume(): void
}

export interface IInputObj {
    type: string,
    min: string,
    max: string,
    value: string

}