import {Component} from "@angular/core";

@Component({
    selector: 'login-view',
    template: `
<div>
    <div class="row">
        <div class="col-sm-12 col-md-6 mx-auto">
            <h2>Login View</h2>
            <form>
                <div class="form-group">
                    <input placeholder="Username" type="text" class="form-control">
                    <span class="fa fa-user"></span>
                </div>
                <div class="form-group">
                    <input placeholder="Password" type="password" class="form-control">
                    <span class="fa fa-lock"></span>
                </div>
                <button class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</div>
`,
})

export class LoginViewComponent  {

}
