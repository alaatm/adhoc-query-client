import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { Widget } from '../helpers';
import { Tree } from 'antd';
import { ITableDescriptor, isTableDescriptor } from '../../interfaces';
import IColumnDescriptor from '../../interfaces/IColumnDescriptor';
const TreeNode = Tree.TreeNode;

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class AvailableColumns extends React.Component<IProps, {}> {
    constructor(props: {}) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(checkedKeys: string[]) {
        this.props.store!.selectColumns(checkedKeys);
    }

    renderNodes(data: (ITableDescriptor | IColumnDescriptor)[]): JSX.Element[] {
        return data.map((item, i) => {
            if (isTableDescriptor(item)) {
                return (
                    <TreeNode title={item.text} key={item.id} selectable={false}>
                        {this.renderNodes(item.columns)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={item.text} selectable={false} />;
        });
    }

    render() {
        return (
            <Widget title="Available Columns" className="aq-avail-cols">
                <Tree
                    checkable={true}
                    onCheck={this.handleCheck}
                >
                    {this.renderNodes(this.props.store!.availableColumns)}
                </Tree>
            </Widget>
        );
    }
}

export default AvailableColumns;