import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import ErrorMessageText from "../ErrorMessage/ErrorMessage"; 
import { AxiosError } from "axios";


interface NoteFormProps {
  onClose: () => void;
}


interface NoteFormValues {
  title: string;
  content: string; 
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}


const initialValues: NoteFormValues = {
  title: "",
  content: "", 

  tag: "Todo",
};


const Schema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag value"
    )
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

 
  const mutation = useMutation({
    mutationFn: async (task: NoteFormValues) => createNote(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const { isPending, isError, error } = mutation;

  const handleCreateTask = (values: NoteFormValues) => {
    mutation.mutate(values); 
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={handleCreateTask}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {!isPending ? "Create note" : "Loading..."}
          </button>
        </div>

        {isError && (
          <ErrorMessageText
            message={
              error instanceof AxiosError
                ? error.response?.data?.message || "Something went wrong"
                : "An unknown error occurred"
            }
          />
        )}
      </Form>
    </Formik>
  );
}