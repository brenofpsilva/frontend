import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { Collaborator } from 'src/app/interfaces/collaborator';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent {

  collaborators?: Collaborator[];

  constructor(private collaboratorService: CollaboratorService){}

  ngOnInit(): void {
    this.collaboratorService.list().subscribe(

      collaborators => {
        console.log(collaborators);
        // collaborators.map(obj => console.log(obj))
        this.collaborators = collaborators
      }
    )
  }

}
