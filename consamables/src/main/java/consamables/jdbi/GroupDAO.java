package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;
import consamables.jdbi.mapper.GroupMapper;
import consamables.jdbi.models.Group;

@RegisterMapper(GroupMapper.class)
public interface GroupDAO
{
    @SqlQuery("SELECT * FROM \"group\"")
    List<Group> getAll();

    @SqlQuery("SELECT * FROM \"group\" WHERE group_id = :groupId")
    Group getGroup(@Bind("groupId") int groupId);

    @SqlUpdate("INSERT INTO \"group\" " +
               "(restaurant_id, start_time, duration, min_people, phase) " +
               "VALUES " +
               "(:restaurantId, :startTime, :duration, :minPeople, :phase)")
    void addGroup(@BindBean Group group);

    @SqlUpdate("UPDATE \"group\" SET " +
               "(restaurant_id, start_time, duration, min_people, phase) = " +
               "(:restaurantId, :startTime, :duration, :minPeople, :phase) " +
               "WHERE group_id = :groupId")
    void updateGroup(@BindBean Group group);

    @SqlUpdate("DELETE FROM \"group\" WHERE group_id = :groupId")
    void deleteGroup(@Bind("groupId") int groupId);
}