from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'fc0268778b9e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('libro',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('titulo', sa.String(length=100), nullable=False),
                    sa.Column('autor', sa.String(length=100), nullable=False),
                    sa.Column('categoria', sa.String(
                        length=100), nullable=False),
                    sa.Column('detalle', sa.Text(), nullable=False),
                    sa.Column('precio', sa.Float(), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('user',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('email', sa.String(length=120), nullable=False),
                    sa.Column('password', sa.String(
                        length=80), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email')
                    )
    op.create_table('cart_item',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('libro_id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('quantity', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['libro_id'], ['libro.id']),
                    sa.ForeignKeyConstraint(['user_id'], ['user.id']),
                    sa.PrimaryKeyConstraint('id')
                    )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cart_item')
    op.drop_table('user')
    op.drop_table('libro')
    # ### end Alembic commands ###