import Vue from "vue";
export default class ImageZoomOnHover extends Vue {
    readonly imageUrl: string;
    get imageStyle(): {
        "background-color": string;
        "background-image": string;
        "background-size": string;
        "background-position": string;
        transition: string;
        height: string;
        width: string;
    };
}
