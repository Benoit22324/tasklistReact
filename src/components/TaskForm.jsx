import { useSelector, useDispatch } from 'react-redux'
import { selectTitle } from '../store/selector/task';
import { addTask, updateTitle } from '../store/reducer/taskReducer';

const TaskForm = () => {
    const dispatch = useDispatch();
    const title = useSelector(selectTitle);

    const update = (e) => {
        dispatch(updateTitle(e.target.value));
    }

    const add = () => {
        if (title.trim() !== '') dispatch(addTask());
    }

    return <>
        <div className='task_form'>
            <input className='task_form_input' type="text" name="title" value={title} onChange={update} placeholder='Votre Titre' />
            <button className='task_form_submit' onClick={add}>Ajouter</button>
        </div>
    </>
}

export default TaskForm