import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Utils from '../utils';
import LineConfigurator from './LineConfigurator';


const defaultLine = {
  config: {
    color: '#ABCDEF'
  }
};

class LinesConfigurator extends React.Component {
  constructor() {
    super();

    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleAddingLineChange = this.handleAddingLineChange.bind(this);
    this.handleAxisConfigLineAdd = this.handleAxisConfigLineAdd.bind(this);

    this.state = {
      showModal: false,
      addingLine: defaultLine
    };
  }

  handleModalToggle() {
    const newAddingLine = this.state.showModal ? defaultLine : this.state.addingLine;
    this.setState({
      showModal: !this.state.showModal,
      addingLine: newAddingLine
    });
  }

  handleAddingLineChange(newLine) {
    this.setState({
      addingLine: newLine,
      showLineConfigError: false
    });
  }

  handleAxisConfigLineAdd() {
    const { axisName, onAxisConfigLineAdd } = this.props;
    const { addingLine } = this.state;

    if (addingLine.resultId == null || addingLine.logKey == null) {
      // invalid
      this.setState({
        showLineConfigError: true
      });
    } else {
      onAxisConfigLineAdd(axisName, addingLine);
      this.handleModalToggle();
    }
  }

  render() {
    const { line2key, truncateForward } = Utils;
    const { results, lines = [] } = this.props;
    const { addingLine, showLineConfigError } = this.state;

    const lineConfiguratorElems = lines.map((line) => {
      const result = results[line.resultId] || {};
      const { config = {} } = line;

      const colorBlockStyle = {
        width: '20px',
        height: '15px',
        backgroundColor: config.color
      };

      return (
        <li className="list-group-item" key={line2key(line)}>
          <div className="row">
            <div className="col-sm-1" style={colorBlockStyle} />
            <div className="col-sm-5">{truncateForward(result.pathName, 24)}</div>
            <div className="col-sm-4">{line.logKey}</div>
            <div className="col-sm-1">
              <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
          </div>
        </li>
      );
    });

    return (
      <ul className="list-group list-group-flush">
        {lineConfiguratorElems}
        <li className="list-group-item text-right">
          <button
            type="button"
            className="btn btn-default btn-xs"
            onClick={this.handleModalToggle}
          >
            <span className="glyphicon glyphicon-plus" /> Add
          </button>

          <Modal isOpen={this.state.showModal} toggle={this.handleModalToggle} className="">
            <ModalHeader toggle={this.handleModalToggle}>Modal title</ModalHeader>
            <ModalBody>
              <LineConfigurator
                results={results}
                line={addingLine}
                showError={showLineConfigError}
                onChange={this.handleAddingLineChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.handleModalToggle}>Cancel</Button>{' '}
              <Button color="primary" onClick={this.handleAxisConfigLineAdd}>Add</Button>
            </ModalFooter>
          </Modal>

        </li>
      </ul>
    );
  }
}

LinesConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  axisName: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      resultId: PropTypes.number,
      logKey: PropTypes.string
    })
  ),
  onAxisConfigLineAdd: PropTypes.func.isRequired
};

LinesConfigurator.defaultProps = {
  lines: []
};

export default LinesConfigurator;
