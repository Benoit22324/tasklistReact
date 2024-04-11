import { useSelector, useDispatch } from 'react-redux'
import { selectError, selectTitle } from '../store/selector/task';
import { addError, addTask, updateTitle } from '../store/reducer/taskReducer';

const TaskForm = () => {
    const dispatch = useDispatch();
    const title = useSelector(selectTitle);
    const error = useSelector(selectError);

    const update = (e) => {
        dispatch(updateTitle(e.target.value));
    }

    const add = () => {
        if (title.trim() !== '') dispatch(addTask());
        else if (title.trim() === '') dispatch(addError('Veuillez saisir le nom de la tâche'))
    }

    return <>
        {
            error !== '' && <p className='error_msg'>{error}</p>
        }
        <div className='task_form'>
            <input className='task_form_input' type="text" name="title" value={title} onChange={update} placeholder='Votre Titre' />
            <button className='task_form_submit' onClick={add}>Ajouter</button>
        </div>
    </>
}

export default TaskForm