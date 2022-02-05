interface FoodProps {
    dot: number[]
}

export default function Food(props: FoodProps) {
    const styleFood = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }
    return (
        <div className="snake-food" style={styleFood}>
        </div>
    )
}