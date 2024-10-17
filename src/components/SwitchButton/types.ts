import { EventProp } from '@utils/helpers'
import { ComponentObjectPropsOptions } from 'vue'

export type SwitchButtonPropsType = ComponentObjectPropsOptions<{
  checked: Boolean,
  onClick: EventProp<[Event]>
}>

export const SwitchButtonProps: SwitchButtonPropsType = {
  checked: {

  },
  onClick: {
    
  }
}