import React              from 'react';
import { shallow, mount } from 'enzyme';

import ProposalAnswerBox  from './proposal_answer_box.component';
import RichEditor         from '../application/rich_editor.component';

describe("Proposal answer box component", function () {
  it("should render a rich editor for the message", function () {
    const wrapper = shallow(
      <ProposalAnswerBox 
        answerMessage="Just a simple message" 
        answerStatus="" />
    );
    expect(wrapper).to.have.descendants(RichEditor);
  });

  describe("clicking on the accept button", function () {
    it("should call updateAnswer function with status accepted", function () {
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <ProposalAnswerBox 
          onButtonClick={onButtonClick}
          answerMessage="I accept this proposal because it looks great" 
          answerStatus="" />
      );

      wrapper.find('button.accept').simulate('click');

      expect(onButtonClick).to.have.been.calledWith({ 
        message: "<div>I accept this proposal because it looks great</div>",
        status: "accepted"
      });
    });
  });

  describe("clicking on the reject button", function () {
    it("should call updateAnswer function with status rejected", function () {
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <ProposalAnswerBox 
          onButtonClick={onButtonClick}
          answerMessage="This is unacceptable!" 
          answerStatus="" />
      );

      wrapper.find('button.reject').simulate('click');

      expect(onButtonClick).to.have.been.calledWith({ 
        message: "<div>This is unacceptable!</div>",
        status: "rejected"
      });
    });
  });
});
