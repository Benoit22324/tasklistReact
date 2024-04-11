import { useSelector, useDispatch } from 'react-redux';
import { selectList, selectLoadingmsg, selectStatut } from '../store/selector/task';
import { deleteTask, updateTask } from '../store/reducer/taskReducer';

const TaskList = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    const statut = useSelector(selectStatut);
    const loadingmsg = useSelector(selectLoadingmsg);

    return <>
        {
            statut === 'loading' && <p>{loadingmsg}</p>
        }
        {
            list.length > 0 ?
            list.map((task, index) =>
                <div key={index} className='task'>
                    <h2>{task.title}</h2>
                    {
                        task.completed ?
                        <p onClick={() => dispatch(updateTask({...task, completed: false}))} className='task_completed'>Fini</p>
                        :
                        <p onClick={() => dispatch(updateTask({...task, completed: true}))} className='task_notcompleted'>Pas fini</p>
                    }
                    <button onClick={() => dispatch(deleteTask(task.id))} className='task_del_btn'>X</button>
                </div>
            )
            :
            <p>Aucune tâche n'a été ajouté !</p>
        }
    </>
}

export default TaskList