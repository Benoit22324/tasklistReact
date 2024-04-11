import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectError, selectTitle } from '../store/selector/task';
import { addError, fetchTask, newTask, updateTitle } from '../store/reducer/taskReducer';

const TaskForm = () => {
    const dispatch = useDispatch();
    const title = useSelector(selectTitle);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchTask());
    }, [])

    const update = (e) => {
        dispatch(updateTitle(e.target.value));
    }

    const add = () => {
        if (title.trim() !== '') dispatch(newTask({userId: 1, title: title.trim(), completed: false}));
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