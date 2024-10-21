/* eslint-disable @typescript-eslint/no-unused-vars */
import PropsValidator from "@utils/PropsValidator";
import { ClassValue, FromToRange } from "@components/commonTypes";
import { ExtractPropTypes, PropType } from "vue";

type SameDateFormatConfig = Partial<FromToRange<string>>;

export const dateInputProps = {
  inputClass: [String, Object, Array] as PropType<ClassValue>,
  refName: String as PropType<string>,
  name: String as PropType<string>,
  type: String as PropType<string>,
  placeholder: String as PropType<string>,
  id: String as PropType<string>,
  required: Boolean as PropType<boolean>,
  format: {
    type: String as PropType<string>,
    default: "DD/MM/YYYY HH:mm",
  },
  sameDateFormat: {
    type: Object as PropType<SameDateFormatConfig>,
    validator: PropsValidator.isValidSameDateFormat,
    default: () =>
      ({
        from: "DD/MM/YYYY, HH:mm",
        to: "HH:mm",
      } as SameDateFormatConfig),
  },
  language: {
    type: String as PropType<string>,
    default: "en",
  },
  selectedStartDate: Date as PropType<Date>,
  selectedEndDate: Date as PropType<Date>,
};

export type DateInputProps = ExtractPropTypes<typeof dateInputProps>;

export const dateInputEmits = defineEmitOptions({
  click: (_e: Event) => true,
});

export type DateInputEmits = typeof dateInputEmits;
