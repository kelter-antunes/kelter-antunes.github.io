var createdNodeID = 0;
$(function() {
    $('.ajax').jstree({
        'core': {
            'themes': {
                'name': 'proton',
                'url': '/CMS/jsTree/themes/proton/style.min.css',
                'responsive': true
            },
            'check_callback': function(operation, node, node_parent, node_position, more) {
                // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
                // in case of 'rename_node' node_position is filled with the new node name
                // return operation === 'rename_node' ? true : false;

                if (operation === 'create_node') {

                    console.log('#### create_node  start #####');

                    console.log(node);
                    console.log(node_parent);
                    console.log(node_position);
                    console.log(more);


                    $.ajax({
                        url: '//dp1dev.outsystems.com/CMSCore/rest/cms_private/folderOperation',
                        type: 'GET',
                        async: true,
                        data: {
                            'operation': operation,
                            //'node': node.id,
                            'node_parent': node_parent.id,
                            'node_position': node_position,
                            'userid': SessionUser

                        },
                        success: function(data, textStatus, xhr) {

                            console.log(data);
                            console.log(textStatus);
                            console.log(xhr);

                            createdNodeID = data;
                        }
                    });



                    console.log('#### create_node  end #####');

                } else if (operation === 'rename_node') {


                    console.log('#### rename_node  start #####');


                    if (createdNodeID !== 0) {
                        $.ajax({
                            url: '//dp1dev.outsystems.com/CMSCore/rest/cms_private/folderOperation',
                            type: 'GET',
                            async: false,
                            data: {
                                'operation': operation,
                                'node': createdNodeID,
                                'node_parent': node_parent.id,
                                'node_position': node_position,
                                'userid': SessionUser

                            },
                            success: function(data, textStatus, xhr) {

                                console.log(data);
                                console.log(textStatus);
                                console.log(xhr);

                            }
                        });


                        //node.id = createdNodeID;
                        createdNodeID = 0;
                    };


                    console.log(node);
                    console.log(node_parent);
                    console.log(node_position);
                    console.log(more);
                    console.log('#### rename_node  end #####');

                    return true;

                } else if (operation === 'move_node') {
                    $.ajax({
                            url: '//dp1dev.outsystems.com/CMSCore/rest/cms_private/folderOperation',
                            type: 'GET',
                            data: {
                                'operation': operation,
                                'node': node.id,
                                'node_parent': node_parent.id,
                                'node_position': node_position,
                                'userid': SessionUser

                            },
                        })
                        .done(function() {
                            console.log('success');
                        })
                        .fail(function() {
                            console.log('error');
                        })
                        .always(function() {
                            console.log('complete');
                        });
                }




                return true;
            },
            'data': {
                'url': '//dp1dev.outsystems.com/CMSCore/rest/cms_private/getFoldersTree?lazy',
                'data': function(node) {
                    externalNode = node;
                    return {
                        'id': node.id
                    };
                }
            }
        },
        'dnd': {
            check_while_dragging: false
        },
        'plugins': ['contextmenu', 'dnd', 'unique']
    });
});
