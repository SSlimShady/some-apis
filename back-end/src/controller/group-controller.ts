import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm"
import { Group } from "../entity/group.entity"
import { Student } from "../entity/student.entity"
import { CreateGroupInput, UpdateGroupInput } from "../interface/group.interface"

export class GroupController {
  private groupRepository = getRepository(Group)
  async allGroups(request: Request, response: Response, next: NextFunction) {
    return this.groupRepository.find();
  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request;
    //We can add more handling if needed (like uppercase values)
    if(params.name === undefined || params.number_of_weeks === undefined || params.roll_states === undefined || params.incidents === undefined || params.ltmt === undefined || !["unmark" , "present" , "absent" , "late"].includes(params.roll_states) || !["<",">"].includes(params.ltmt)){
      response.status(400).send('Missing/Invalid Data');
      return;
    }
    const createGroupInput: CreateGroupInput = {
      name: params.name,
      number_of_weeks: params.number_of_weeks,
      roll_states: params.roll_states,
      incidents: params.incidents,
      ltmt: params.ltmt,
      run_at: new Date(),
      student_count: 0,
    }
    const group = new Group();
    group.prepareToCreate(createGroupInput);

    return this.groupRepository.save(group)
  }

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request
    if(params.id === undefined || params.id === ''){
      response.status(400).send('Missing/Invalid Data');
      return;
    }
    if(params.roll_states !== undefined && !["unmark" , "present" , "absent" , "late"].includes(params.roll_states)){
      response.status(400).send('Invalid Data');
      return;
    }
    if(params.ltmt !== undefined &&  !["<",">"].includes(params.ltmt)){
      response.status(400).send('Invalid Data');
      return;
    }
    this.groupRepository.findOne(params.id).then((group) => {
      const updateGroupInput: UpdateGroupInput = {
        id: params.id,
        name: params.name,
        number_of_weeks: params.number_of_weeks,
        roll_states: params.roll_states,
        incidents: params.incidents,
        ltmt: params.ltmt,
        run_at: new Date(),
        student_count: params.student_count
      }
      group.prepareToUpdate(updateGroupInput);
      return this.groupRepository.save(group);
    })
    //We can add further checks based on query results (if query fails then show error)
    response.status(200).send('Updated!');
    return;
  }

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request;
    if(params.id === undefined || params.id === ''){
      response.status(400).send('Missing/Invalid Data');
      return;
    }
    let groupToRemove = await this.groupRepository.findOne(params.id)
    await this.groupRepository.remove(groupToRemove)
    .then(() =>
      response.status(200).send('Deleted!')
    )
    .catch((err) => 
      response.status(500).send(err)
    );
    
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    if(request.params.id === undefined || request.params.id === ''){
      response.status(400).send('Missing/Invalid Data');
      return;
    }
    // return request.params.id;
    let studentRepository = getRepository(Student)
    return await studentRepository
    .createQueryBuilder("stud")
    .select(["stud.id","stud.first_name","stud.last_name","stud.first_name || ' ' || stud.last_name AS full_name"])
    .leftJoin("group_student","stgrp")
    .where("stgrp.group_id = :grpid",{ grpid:request.params.id})
    .andWhere("stud.id = stgrp.student_id")
    .getRawMany();
  }


  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    // Task 2:
  
    // 1. Clear out the groups (delete all the students from the groups)

    // 2. For each group, query the student rolls to see which students match the filter for the group

    // 3. Add the list of students that match the filter to the group
  }
}
