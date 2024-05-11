import {Component, Input, OnInit, Output} from '@angular/core';
import {CommentType} from "../../../../types/comment.type";
import {CommentService} from "../../services/comment.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  public date: string = '';
  public time: string = "";
  private isLogged: boolean = this.authService.getIsLoggedIn();
  @Input() comment!: CommentType;
  @Output() actionChange: Subject<any> = new Subject();

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.setDate();
    // console.log(this.comment);
  }

  private setDate(): void {
    let date = new Date(this.comment.date);
    this.date = date.toLocaleDateString("ru-Ru");
    this.time = date.toLocaleTimeString("ru-Ru", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  public leaveReaction(commentId: string, actionType: string): void {
    if (this.isLogged) {
      if (!this.comment.action) {
        switch (actionType) {
          case "like":
            this.addLike();
            break;
          case "dislike":
            this.addDislike();
            break;
        }
      }
      if (this.comment.action === "like") {
        switch (actionType) {
          case "dislike":
            this.remLike();
            this.addDislike();
            break;
          case "removeLike":
            this.remLike();
            this.comment.action = undefined;
            break;
        }
      }
      if (this.comment.action === "dislike") {
        switch (actionType) {
          case "like":
            this.remDislike();
            this.addLike();
            break;
          case "removeDislike":
            this.remDislike();
            this.comment.action = undefined;
            break;
        }
      }
      if (actionType === 'violate') {
        this.commentService.applyAction(commentId, actionType).subscribe({
          next: (data: DefaultResponseType) => {
            this.openSnackBar('Жалоба отправлена');
          },
          error: (err: HttpErrorResponse): void => {
            if (err.status === 400) {
              this.openSnackBar('Жалоба уже отправлена');
            }
          }
        });
      } else {
        actionType = actionType === "removeLike" ? "like" : actionType;
        actionType = actionType === "removeDislike" ? "dislike" : actionType;
        this.commentService.applyAction(commentId, actionType).subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              this.snackBar.open('Ваш голос учтен');
              this.actionChange.next(actionType);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        });
      }
    } else {
      console.log(this.isLogged);
    }
  }

  private addLike() {
    this.comment.likesCount++;
  }

  private addDislike() {
    this.comment.dislikesCount++;
  }

  private remLike() {
    this.comment.likesCount--;
  }

  private remDislike() {
    this.comment.dislikesCount--;
  }

  public openSnackBar(message: string): void {
    this.snackBar.open(message);
  }
}
