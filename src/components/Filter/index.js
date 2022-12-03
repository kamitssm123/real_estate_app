import './style.css';
import { FaCaretDown } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const Filter = ({data, selectedFilters, setSelectedFilters}) => {

  const onOptionClick = (option) => {
    let temp = selectedFilters[data.key];
    if(selectedFilters[data.key].includes(option)) {
      temp = temp.filter(elem => elem !== option);
    } else {
      temp.push(option);
    }
    setSelectedFilters(curr => ({...curr, [data.key]: temp}));
  }

  return (
    <>
      <div className="col-md-3 col-sm-6 col-xs-6">
        <button className="filterButton" data-toggle="modal" data-target={`#${data.key}`}>
          <div className="filterTitle">{data.title}</div>
          <FaCaretDown />
        </button>
        <div className="selectedOptions">
          {
            selectedFilters[data.key].map(elem => (
              <div className="selectedOption">
                <span>{elem}</span>
                <button className="removeOption" onClick={() => onOptionClick(elem)}>
                  &times;
                </button>
              </div>
            ))
          }
        </div>
      </div>
      <div className="modal fade" id={data.key} tabIndex="-1" role="dialog" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{display: 'flex'}}>
              <h5 className="modal-title" id="filterModalLabel" style={{flex: 1}}>{data.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{padding: 0}}>
              {
                data.options.map(option => (
                  <button key={option} className="optionContainer" onClick={() => onOptionClick(option)}>
                    {
                      selectedFilters[data.key].includes(option) ? <MdCheckBox className="checkbox" size={20} /> : <MdCheckBoxOutlineBlank className="checkbox" size={20} />
                    }
                    <div>{option}</div>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;