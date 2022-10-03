import { CSSProperties } from "react";
import { CartHover } from "../pages/cart";

interface P {
    hover: CartHover;
}
export function CartHoverComponent({ hover }: P) {
    const { e, img } = hover;
    const style: CSSProperties = {
        position: 'absolute',
        top: e.clientY + 50,
    };
    return (
        <img style={style} src={img} />
    );
}
