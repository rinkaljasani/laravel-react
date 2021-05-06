<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
class TasksController extends Controller
{
   
    public function index()
    {
        return Task::get();
    }

    public function store(Request $request)
    {
        return Task::create($request->all());        
    }
   
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());
        return $task;
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return "Delete Sucessfully";        
    }
}
