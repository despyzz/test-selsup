import React from "react";

interface Param {
  id: number;
  name: string;
  // type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  // colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Map<number, string>;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: new Map(props.model.paramValues.map(pv => [pv.paramId, pv.value]))
    };
  }

  handleParamChange = (id: number, value: string) => {
    this.setState(prevState => ({
      paramValues: prevState.paramValues.set(id, value)
    }));
  }

  getModel(): Model {
    return {
      paramValues: Array.from(this.state.paramValues.entries()).map(([paramId, value]) => ({paramId, value}))
    };
  }

  render() {
    const {params} = this.props;

    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: "20px"}}>
        {
          params.map((param: Param) => {
            const paramValue = this.state.paramValues.get(param.id) || '';
            return (
              <div key={param.id} style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{minWidth: "150px"}}>{param.name}</div>
                <input
                  value={paramValue}
                  onChange={(e) => this.handleParamChange(param.id, e.target.value)}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

class App extends React.Component<unknown> {
  paramEditorRef: React.RefObject<ParamEditor>;

  constructor(props: unknown) {
    super(props);
    this.paramEditorRef = React.createRef();
  }

  handleButtonClick = () => {
    if (this.paramEditorRef.current) {
      const model = this.paramEditorRef.current.getModel();
      console.log(model);
    }
  }

  render() {
    const params: Param[] = [
      {
        "id": 1,
        "name": "Назначение"
      },
      {
        "id": 2,
        "name": "Длина"
      }
    ]
    const model: Model = {
      "paramValues": [
        {
          "paramId": 1,
          "value": "повседневное"
        },
        {
          "paramId": 2,
          "value": "макси"
        }
      ]
    }
    return (
      <div>
        <ParamEditor ref={this.paramEditorRef} params={params} model={model}/>
        <button onClick={this.handleButtonClick} style={{marginTop: "20px"}}>getModel</button>
      </div>
    );
  }
}

export default App;