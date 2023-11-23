import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'

export interface CardProps {
  title: string
  icon?: string
  description: string
}
export default function Card({ title, icon, description }: CardProps) {
  return (
    <div className="flex flex-col px-2 justify-between">
      {<FontAwesomeIcon icon={faAddressBook} size='2xl' className='mb-2'/>}
      <h3 className="text-xl mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
