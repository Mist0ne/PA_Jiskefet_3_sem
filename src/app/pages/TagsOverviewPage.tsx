/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Table from '../molecules/Table';
import { IColumn } from '../interfaces/Column';
import Layout from '../organisms/Layout';
import * as Cookies from 'js-cookie';
import { getTags} from '../constants/apiUrls';

// import ReactTableComponent from './ReactTableComponent.js';
// import Table from '@material-ui/core/Table';

export default class TagsOverviewPage extends MithrilTsxComponent<{}> {

    // tslint:disable-next-line:typedef
    state = {
        data: [{tag_id: 1, tag_text: 2}]
    };
    columns: IColumn[] = [{header: 'tag id', accessor: 'tagId'}, {header: 'tag text', accessor: 'tagText'}];
    b:any;
    a = this.getData({
                         method: 'GET',
                         url: getTags()
                     });
    // tslint:disable-next-line:typedef
    async getData( options: m.RequestOptions<{}> & { url: string }): Promise<any> {
        const token = Cookies.get('token');
        if (token) { // If JWT token exists as a cookie, add token to request.
            options = {
                ...options,
                headers: {
                    Authorization: `bearer ${token}`
                }
            };
        }
        return await m.request(options); }
    render() {
        this.a.then(res => (this.b = res));
        console.log(this.b);
        if (this.b !== undefined){
            console.log(this.b.data.items[0]);
            return (
                <Layout>
                    <Table columns={this.columns} data={this.b.data.items} />
                </Layout>
            );
        }
        return (
            <Layout>
                <Table columns={this.columns} data={this.state.data} />
            </Layout>
        );
    }
view() {
        return (this.render());
    }
}
