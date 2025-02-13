import { memo } from "react"
import Proptypes from "prop-types"

const TaskItem = memo(({item, index, handleEdit, handleDelete}) => {
    return (
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
                <button onClick={() => handleEdit(index)}><i className="fa fa-pencil" /></button>
                <button onClick={() => handleDelete(index)}><i className="fa fa-trash" /></button>
            </td>
        </tr>
    )
})

TaskItem.displayName = 'TaskItem'
TaskItem.propTypes = {
    item:  Proptypes.object,
    index: Proptypes.number,
    handleEdit: Proptypes.func,
    handleDelete: Proptypes.func,
}
export default TaskItem