"use client"

import { Loader, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DottedSeperator } from "@/components/dotted-seperator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

import { useCreateTaskModal } from "../hooks/use-create-task-modal"
import { useGetTasks } from "../api/use-get-tasks"
import { useQueryState } from "nuqs"
import { DataFilters } from "./data-filters"
import { useTaskFilters } from "../hooks/use-task-filters"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { DataKanban } from "./data-kanban"
import { useCallback } from "react"
import { TaskStatus } from "../types"
import { useBulkUpdateTasks } from "../api/use-bulk-update-task"
import { DataCalendar } from "./date-calendar"
import { useProjectId } from "@/features/projects/hooks/use-project-id"

interface TaskViewSwitcherProps {
    hideProjectFilter?: boolean;
    projectId?: string;
}

export const TaskViewSwitcher = ({
    hideProjectFilter,
    projectId: forcedProjectId }: TaskViewSwitcherProps) => {

    const [{
        status,
        assigneeId,
        projectId,
        dueDate,
    }] = useTaskFilters();


    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    })

    const { mutate: bulkUpdate } = useBulkUpdateTasks();

    const workspaceId = useWorkspaceId();
    const paramProjectId = useProjectId();
    const { open } = useCreateTaskModal();

    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
        workspaceId,
        projectId: paramProjectId || projectId ,
        status,
        assigneeId,
        dueDate,
    });

    const onKanbanChange = useCallback((
        tasks: { $id: string; status: TaskStatus; position: number }[]
    ) => {
        bulkUpdate({
            json: { tasks },
        })
    }, [bulkUpdate])



    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}

            className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow auto p-4 ">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto ">

                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calender"
                        >
                            Calender
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="w-full lg:w-auto"
                    >
                        <PlusIcon className="size-4 mr-2" />
                        New
                    </Button>

                </div>
                <DottedSeperator className="my-4" />

                <DottedSeperator className="my-4" />
                <DataFilters hideProjectFilter={hideProjectFilter} />
                <DottedSeperator className="my-4" />
                {isLoadingTasks ? (
                    <div className="w-full flex flex-col border rounded-lg h-[200px] items-center justify-center">
                        <Loader className="size-5 animate-spin" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                            <DataTable columns={columns} data={tasks?.documents ?? []} />
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
                        </TabsContent>
                        <TabsContent value="calender" className="h-full pb-4 mt-0">
                            <DataCalendar data={tasks?.documents ?? []} />
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    )
}