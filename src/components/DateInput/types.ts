/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractPropTypes } from "vue";

export const dateInputProps = definePropOptions({
  inputClass: [String, Object, Array],
  refName: String,
  name: String,
  type: String,
  placeholder: String,
  id: String,
  required: Boolean,
  format: String,
  sameDateFormat: Object,
  language: String,
  selectedStartDate: Date,
  selectedEndDate: Date,
});

export type DateInputProps = ExtractPropTypes<typeof dateInputProps>;

export const dateInputEmits = defineEmitOptions({
  click: (_e: Event) => true,
});

export type DateInputEmits = typeof dateInputEmits
