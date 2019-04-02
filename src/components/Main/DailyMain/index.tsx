import React from "react";
import DailyShiftTimer from "./DailyShiftTimer";
import DailyTodoWidget from "./DailyTodoWidget";
import TodoStore from "../../../stores/TodoListStore";
import ViewStore from "../../../stores/TodoViewStore";
import { RouteChildrenProps } from "react-router";

const DailyShiftMain = (props: RouteChildrenProps) => {
  return (
    <React.Fragment>
      <DailyShiftTimer {...props} start_time="08:30" num_of_hrs={8.5} />
      <DailyTodoWidget todoStore={new TodoStore()} viewStore={ViewStore} />
    </React.Fragment>
  );
};

export { DailyShiftMain };
