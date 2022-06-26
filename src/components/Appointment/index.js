import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode.js';



export default function Appointment(props) {
  //Save
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition('SAVING');
    props.bookInterview(props.id, interview, false).then(() => {transition('SHOW');}).catch(() => {transition('ERROR_SAVE',true);});
  }

  //Delete

  function cancelInterview() {
    transition('DELETING',true);
    props.cancelInterview(props.id).then(() => {transition('EMPTY');}).catch(() => {transition('ERROR_DELETE', true);});
  }

  //Edit
  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition('SAVING');
    props.bookInterview(props.id, interview, true).then(() => {transition('SHOW');}).catch(() => {transition('ERROR_SAVE');});
  }


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition("CONFIRM")}
          onEdit={() => transition("EDIT")}
        />
      )}

      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === ERROR_SAVE && (
        <Error message={"Error: Could not save appointment"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error: Could not delete appointment"} onClose={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={edit}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={back}
          onConfirm={cancelInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}