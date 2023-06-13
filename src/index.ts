import {weathers} from "./data/data";
import "./style/index.scss"

import {IElement, IElementClass, IImageElement, IInputElement, IInputObj, IItemElement} from "./types/types";
const root = document.getElementById('root') as HTMLElement


class Element implements IElementClass {
    element: HTMLElement
    tagName: string = ""
    className: string = ""
    id?: string = ""
    constructor(obj: IElement) {
        this.tagName = obj.tagName
        this.className = obj.className
        this.id = obj.id
        this.element = document.createElement(this.tagName)
        this.element.classList.add(this.className)
        this.element.id = this.id ?? ""
    }
    addChild(childs: HTMLElement[]): void {
        childs.forEach(child => this.element.appendChild(child))
    }

    preAddChild(childs: HTMLElement[]): void {
        childs.forEach(child => this.element.prepend(child))
    }
    set text(text: string) {
        this.element.innerText = text
    }
}

class ElementWithSrc extends Element implements IImageElement {
    element: HTMLImageElement | HTMLAudioElement
    src: string
    constructor(obj: IElement, src: string) {
        super(obj)
        this.element = document.createElement(this.tagName) as HTMLImageElement | HTMLAudioElement
        this.element.classList.add(this.className)
        this.element.src = src
        this.src = src
    }
}

class ItemClass extends Element implements IItemElement{
    active: boolean = false
    pause: boolean = false
    constructor(obj: IElement) {
        super(obj);
    }

    changeAudio(picture: string, audio: HTMLAudioElement) {
        this.active = this.element.classList.contains('active');
        this.pause = this.element.classList.contains('pause');

        if (this.active) {
            this.element.classList.remove('active')
            this.element.classList.add('pause')
            audio.pause();
        }
        else if (this.pause) {
            this.element.classList.remove('pause')
            this.element.classList.add('active')
            audio.play();
        }
        else if (!this.active && !this.pause) {

            const items: NodeListOf<HTMLElement> = document.querySelectorAll('.item');
            const audios: NodeListOf<HTMLAudioElement> = document.querySelectorAll('.audio')

            items.forEach(item => {
                item.classList.remove('active')
                item.classList.remove('pause')
            })
            audios.forEach(audio => {
                audio.pause()
                audio.currentTime = 0
            })
            this.element.classList.add('active');
            audio.play()
            background.element.src = picture
        }
    }
}

class InputElement extends Element implements IInputElement{
    element: HTMLInputElement
    type: string
    min: string
    max: string
    value: string | number
    constructor(obj: IElement, inputObj: IInputObj) {
        super(obj);
        this.element = document.createElement(this.tagName) as HTMLInputElement

        this.type = inputObj.type
        this.min = inputObj.min
        this.max = inputObj.max
        this.value = inputObj.value

        this.element.type = this.type
        this.element.classList.add(this.className)
        this.element.value = this.value
        this.element.max = this.max
        this.element.min = this.min

    }
    changeVolume () {
        this.value = this.element.value
        const audios: NodeListOf<HTMLAudioElement> = document.querySelectorAll('.audio')
        audios.forEach(audio => {
            audio.volume = +this.value/100
        })
    }

}

const wrapper = new Element({tagName: 'div', className: "wrapper", id: "wrapper-id"});
const container = new Element({tagName: 'div', className: "container"});
const title = new Element({tagName: 'h1', className: "title"})
const background = new ElementWithSrc({tagName: 'img', className: "background"}, weathers[0].picture)
const volume = new InputElement(
    {tagName: 'input', className:'volume'},
    {max: "100", min: "0", type: "range", value: "100"})


volume.element.addEventListener('change', () => {
    volume.changeVolume()
})

root.appendChild(wrapper.element)
wrapper.addChild([container.element, title.element, background.element, volume.element])
wrapper.preAddChild([title.element])
title.text = "Weather sounds"


weathers.forEach(el => {
    const item = new ItemClass({tagName: 'div', className: 'item', id: el.id});
    const img = new ElementWithSrc({tagName: 'img', className: 'picture'}, el.picture);
    const icon = new ElementWithSrc({tagName: 'img', className: 'icon'}, el.icon);
    const pauseIcon = new ElementWithSrc({tagName: 'img', className: 'pauseIcon'}, el.pauseIcon);
    const audio = new ElementWithSrc({tagName: 'audio', className: "audio", id: `audio-${el.id}`}, el.audio)

    item.addChild([img.element, icon.element, pauseIcon.element, audio.element])
    container.addChild([item.element])

    item.element.addEventListener('click', (): void => {
        item.changeAudio(el.picture, audio.element as HTMLAudioElement)
    })
})