interface SnakeProps {
    snakeDots:number[][]
}

export default function Snake(props: SnakeProps) {
    return (
        <div>
            {props.snakeDots.map((dot, index) => {
                const styleDot = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                }
                return (
                    <div className="snake-dot" key={index} style={styleDot}></div>

                )
            })}
        </div>
    )
}