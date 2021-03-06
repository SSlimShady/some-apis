import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm"
import { Group } from "../entity/group.entity"
import { Student } from "../entity/student.entity"
import { GroupStudent } from "../entity/group-student.entity"
import { CreateGroupInput, UpdateGroupInput } from "../interface/group.interface"
import { CreateGroupStudentInput } from "../interface/group-student.interface"

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
      //initialising as not sure what to do with them when creating 
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
    //Joined both tables and filtered with id field (joins faster than subquery)
    return await studentRepository
    .createQueryBuilder("stud")
    .select(["stud.id","stud.first_name","stud.last_name","stud.first_name || ' ' || stud.last_name AS full_name"])
    .leftJoin("group_student","stgrp")
    .where("stgrp.group_id = :grpid",{ grpid:request.params.id})
    .andWhere("stud.id = stgrp.student_id")
    .getRawMany();
  }


  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request;
    if(params.number_of_weeks === undefined  || params.roll_states === undefined || params.incidents === undefined || params.ltmt === undefined){
      response.status(400).send('Missing/Invalid Data');
      return;
    }
    // 1. Clear out the groups (delete all the students from the groups)
    //Can add more error handling (if clearing fails then don't proceed etc)
    let groupStudentRepository = getRepository(GroupStudent)
    await groupStudentRepository
    .createQueryBuilder()
    .delete()
    .execute();
    // 2. For each group, query the student rolls to see which students match the filter for the group
    //Joined both tables with where conditions (joins faster than subquery)
    let result = await this.groupRepository
    .createQueryBuilder("grp")
    .leftJoinAndSelect("student_roll_state","stroll")
    .where("grp.number_of_weeks = :weeks",{ weeks: params.number_of_weeks})
    .andWhere("grp.roll_states IN (:...gstates)",{ gstates: params.roll_states})
    .andWhere("grp.ltmt = :ltmt",{ ltmt: params.ltmt})
    .andWhere("grp.incidents = :inc",{ inc: params.incidents})
    .andWhere("stroll.state IN (:...sstates)",{ sstates: params.roll_states})
    .andWhere("stroll.state = grp.roll_states")
    .getRawMany();

    /* 
    ** Alternative to get student count (from query). faster result maybe?
    let COUNTS = await this.groupRepository
    .createQueryBuilder("grp")
    .leftJoinAndSelect("student_roll_state","stroll")
    //To get count from query
    // .addSelect("COUNT (grp.id) as gCOUNT")
    .where("grp.number_of_weeks = :weeks",{ weeks: params.number_of_weeks})
    .andWhere("grp.roll_states IN (:...gstates)",{ gstates: params.roll_states})
    .andWhere("grp.ltmt = :ltmt",{ ltmt: params.ltmt})
    .andWhere("grp.incidents = :inc",{ inc: params.incidents})
    .andWhere("stroll.state IN (:...sstates)",{ sstates: params.roll_states})
    .andWhere("stroll.state = grp.roll_states")
    //To get count from query
    // .groupBy("grp.id")
    .getRawMany();
    */

    // Calculating counts for student incidents and students in group
    let group_student_count_map = new Map();
    let student_incident_count_map = new Map();
    result.forEach((ele) => {
      if(student_incident_count_map.get(ele.stroll_student_id) != undefined){
        student_incident_count_map.set(ele.stroll_student_id, student_incident_count_map.get(ele.stroll_student_id)+1);
      }else{
        student_incident_count_map.set(ele.stroll_student_id,1);
      }
      if(group_student_count_map.get(ele.grp_id) != undefined){
        group_student_count_map.set(ele.grp_id, group_student_count_map.get(ele.grp_id)+1);
      }else{
        group_student_count_map.set(ele.grp_id,1);
      }
    });
    //We can use map or simple for loop if we want to await these calls
    result.forEach((ele) => {
      let group_student_count = group_student_count_map.get(ele.grp_id), student_incident_count = student_incident_count_map.get(ele.stroll_student_id);
      let groupStudentRepository = getRepository(GroupStudent);
      const createGroupStudentInput: CreateGroupStudentInput = {
        group_id: ele.grp_id,
        student_id: ele.stroll_student_id,
        incident_count: student_incident_count
      }
      const groupst = new GroupStudent();
      groupst.prepareToCreate(createGroupStudentInput);
      groupStudentRepository.save(groupst);
      this.groupRepository.findOne(ele.grp_id).then((group) => {
        const updateGroupInput: UpdateGroupInput = {
          id: undefined,
          name: undefined,
          number_of_weeks: undefined,
          roll_states: undefined,
          incidents: undefined,
          ltmt: undefined,
          run_at: new Date(),
          student_count: group_student_count
        }
        group.prepareToUpdate(updateGroupInput);
        return this.groupRepository.save(group);
      });
    });
  }
}
