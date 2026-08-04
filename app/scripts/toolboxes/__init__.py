"""SafeBase Toolbox Talk content registry."""

from .confined_space import CONFINED_SPACE
from .electrical_safety import ELECTRICAL_SAFETY
from .hot_work import HOT_WORK
from .housekeeping import HOUSEKEEPING
from .lifting_operations import LIFTING_OPERATIONS
from .loto import LOTO
from .safety_harness import SAFETY_HARNESS
from .scaffold_safety import SCAFFOLD_SAFETY
from .working_at_height import WORKING_AT_HEIGHT

TOOLBOXES = [
    CONFINED_SPACE,
    ELECTRICAL_SAFETY,
    HOT_WORK,
    HOUSEKEEPING,
    LIFTING_OPERATIONS,
    LOTO,
    SAFETY_HARNESS,
    SCAFFOLD_SAFETY,
    WORKING_AT_HEIGHT,
]

__all__ = ["TOOLBOXES"]
