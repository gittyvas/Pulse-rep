import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function SparkleButton({
  label = "Label",
  background = "#4171E0",
  border = {
    width: 1,
    style: "solid",
    color: "#4171E0",
    radius: 100,
  },
  textColor = "#fafafa",
  hover = {
    background: "#4171E0",
    color: "#fafafa",
    border: "#4171E0",
  },
  onClick = () => {},
}) {
  const ref = useRef(null)
  const [isHover, setHover] = useState(false)
  const [isPressed, setPressed] = useState(false)

  const handleMouseDown = () => setPressed(true)
  const handleMouseUp = () => setPressed(false)
  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => {
    setHover(false)
    setPressed(false)
  }

  const style = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: `${border.radius}px`,
    padding: "0.75rem 1.5rem",
    backgroundColor: isHover ? hover.background : background,
    borderWidth: border.width,
    borderColor: isHover ? hover.border : border.color,
    borderStyle: border.style,
    color: isHover ? hover.color : textColor,
    fontFamily: "Manrope, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    transform: isPressed ? "scale(0.95)" : "scale(1)",
  }

  return (
    <motion.button
      ref={ref}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      {label}
    </motion.button>
  )
}
