import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import {
  faBrush,
  faHammer,
  faHelmetSafety,
  faHouse,
  faScrewdriver,
  faToolbox,
  faTruckPickup,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const iconMap = {
  wrench: faWrench,
  helmet: faHelmetSafety,
  brush: faBrush,
  hammer: faHammer,
  pickup: faTruckPickup,
  toolbox: faToolbox,
  screwdriver: faScrewdriver,
  house: faHouse,
  clipboard: faClipboard,
}

export interface CardProps {
  title: string
  icon?: string
  description: string
}
export default function Card({ title, icon, description }: CardProps) {
  return (
    <div className="flex flex-col px-2">
      <FontAwesomeIcon
        icon={iconMap[icon ?? 'wrench']}
        size="2xl"
        className="mb-2"
      />
      <h3 className="text-xl mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
