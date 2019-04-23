import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import mirador from 'mirador';
import Typography from '@material-ui/core/Typography';

class MiradorDnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false
    }
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.currentTarget.dataset.drag !== 'true') {
      this.setState({
        drag: true
      });
    }
  }

  onDragLeave(e) {
    e.preventDefault();
    this.setState({
      drag: false
    });
  }

  onDrop(e, f) {
    const { addWindow } = this.props;
    e.preventDefault();
    e.dataTransfer.items[0].getAsString((uri) => {
      const url = new URL(uri);
      const search = new URLSearchParams(url.search);
      const manifest = search.get('manifest');
      if (manifest) addWindow({ manifestId: manifest });
    });
    this.setState({
      drag: false
    });
  }

  render() {
    const { TargetComponent } = this.props;
    const { drag } = this.state;
    const style = {
      height: '100%',
    }
    if (drag) style.filter = 'brightness(0.4)';
    const textStyle = {
      display: 'none',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      width: '100%',
      zIndex: 1000,
    }
    if (drag) textStyle.display = 'block';
    return (
      <Fragment>
        <div style={textStyle}>
          <Typography variant="h1" style={{ color: 'white' }}>
            Drop to Load Manifest
          </Typography>
        </div>
        <div
          style={style}
          data-drag={drag}
          onDragOver = {this.onDragEnter}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        > 
          <TargetComponent {...this.props.targetProps}/>
        </div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  addWindow: mirador.actions.addWindow
};

export default {
  target: 'Workspace',
  mode: 'wrap',
  component: MiradorDnd,
  mapDispatchToProps: mapDispatchToProps,
}
