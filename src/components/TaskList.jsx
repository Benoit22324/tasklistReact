import { useSelector, useDispatch } from 'react-redux';
import { selectList } from '../store/selector/task';
import { checkCompletion, delTask, uncheckCompletion } from '../store/reducer/taskReducer';

const TaskList = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectList);

    return <>
        {
            list.length > 0 ?
            list.map((task, index) =>
                <div key={index} className='task'>
                    <h2>{task.title}</h2>
                    {
                        task.completed ?
                        <p onClick={() => dispatch(uncheckCompletion(task.id))} className='task_completed'>Fini</p>
                        :
                        <p onClick={() => dispatch(checkCompletion(task.id))} className='task_notcompleted'>Pas fini</p>
                    }
                    <button onClick={() => dispatch(delTask(task.id))} className='task_del_btn'>X</button>
                </div>
            )
            :
            <p>Aucune tâche n'a été ajouté !</p>
        }
    </>
}

export default TaskList