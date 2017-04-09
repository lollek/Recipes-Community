import {Component} from '@angular/core';

@Component({
    selector: 'search-view',
    template: `
<div>
    <h1>Search View</h1>
    <recipe-list recipes=""></recipe-list>
</div>
`,
})

export class SearchViewComponent  { }
