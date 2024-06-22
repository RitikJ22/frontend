// toolbar.js

import { DraggableNode } from './draggableNode';
import "./styles/toolbar.css"
export const PipelineToolbar = () => {

    return (
        <div className='toolbarWrapper'>
            <div className='toolbarComponet'>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};
