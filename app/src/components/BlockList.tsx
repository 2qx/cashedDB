import React, {Component} from 'react';
import { CashedDB, BlockDocument } from '../../../index';

import './BlockList.css';
import { Subscription } from 'rxjs';


interface IProps {
}

interface IState {
  blocks?: BlockDocument[];
  loading: boolean;
}


class BlockList extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    
        this.state = {
          blocks: [],
          loading: true
        };
        
        
      }
    
    subs:Subscription[] = [];

    async componentDidMount() {
        const db = await (await new CashedDB({})).db;

        const sub = db.collections.block.find().sort({height:"desc"}).$.subscribe(blocks => {
            if (!blocks) {
                return;
            }
            console.log('reload block-list ');
            console.dir(blocks);
            this.setState({blocks, loading: false});
        });
        this.subs.push(sub);
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    deleteBlock = async (block:BlockDocument) => {
        console.log('delete block:');
        console.dir(block);
    }

    editBlock = async (block:BlockDocument) => {
        console.log('edit block:');
        console.dir(block);
    }

    renderActions = ():any => {
        // TODO
        // return (
        //     <div className="actions">
        //         <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.editHero(hero)}></i>
        //         <i className="fa fa-trash-o" aria-hidden="true" onClick={() => this.deleteHero(hero)}></i>
        //     </div>
        // )
        return null
    }

    render() {
        const { blocks, loading } = this.state
        return (
            <div id="list-box" className="box">
                <h3>Blocks</h3>
                <ul id="block-list">
                    {loading && <span>Loading...</span>}
                    {!loading && blocks.length === 0 && <span>No blocks</span>}
                    {blocks.map(block => {
                        return (
                            <li key={block.height}>
                                <span className="name">
                                    {block.height}
                                </span>
                                {this.renderActions()}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default BlockList;