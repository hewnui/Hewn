import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTrigger,
} from "./dialog";

export const DialogRoot = Object.assign(DialogTrigger, {
  Content: Dialog,
  Body: DialogBody,
  Actions: DialogActions,
});

export {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTrigger,
};
